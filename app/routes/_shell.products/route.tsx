import { getUser } from "@/lib/auth.server";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllProducts, getProductsCount } from "@/lib/products.server";
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from "@/components/ui/pagination";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const user = await getUser(context, request);

	if (!user) {
		return redirect("/");
	}

	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const limit = 5;

	const products = await getAllProducts(context, page, limit);
	const totalProducts = await getProductsCount(context);

	return { user, products, page, limit, totalProducts };
}

export default function ProductsPage() {
	const { products, page, limit, totalProducts } = useLoaderData<typeof loader>();
	const totalPages = Math.ceil(totalProducts[0].count / limit);

	const renderPageNumbers = () => {
		const pageNumbers = [];

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={`?page=${i}`}
							isActive={i === page}
						>
							{i}
						</PaginationLink>
					</PaginationItem>
				);
			}
		} else {
			const ellipsisThreshold = 3;
			const showEllipsisLeft = page > ellipsisThreshold + 1;
			const showEllipsisRight = page < totalPages - ellipsisThreshold;

			if (showEllipsisLeft) {
				pageNumbers.push(
					<PaginationItem key={1}>
						<PaginationLink href="?page=1">1</PaginationLink>
					</PaginationItem>
				);
				pageNumbers.push(
					<PaginationItem key="ellipsis-left">
						<PaginationEllipsis />
					</PaginationItem>
				);
			}

			for (
				let i = Math.max(1, page - ellipsisThreshold);
				i <= Math.min(page + ellipsisThreshold, totalPages);
				i++
			) {
				pageNumbers.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={`?page=${i}`}
							isActive={i === page}
						>
							{i}
						</PaginationLink>
					</PaginationItem>
				);
			}

			if (showEllipsisRight) {
				pageNumbers.push(
					<PaginationItem key="ellipsis-right">
						<PaginationEllipsis />
					</PaginationItem>
				);
				pageNumbers.push(
					<PaginationItem key={totalPages}>
						<PaginationLink href={`?page=${totalPages}`}>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				);
			}
		}

		return pageNumbers;
	};

	return (
		<div>
			<h1>Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<h2>{product.name}</h2>
						<p>{product.description}</p>
						<p>Price: ${product.price}</p>
					</li>
				))}
			</ul>
			<Pagination>
				<PaginationContent>
					{page > 1 && (
						<PaginationItem>
							<PaginationPrevious href={`?page=${page - 1}`} />
						</PaginationItem>
					)}
					{renderPageNumbers()}
					{page < totalPages && (
						<PaginationItem>
							<PaginationNext href={`?page=${page + 1}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
