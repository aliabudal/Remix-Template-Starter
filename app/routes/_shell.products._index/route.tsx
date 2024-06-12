import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllProducts, getProductsCount } from "@/lib/products.server";
import { cn, themeBorder } from "@/lib/styles";
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from "@/components/ui/pagination";
import { PlusCircledIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const limit = 5;

	const products = await getAllProducts(context, page, limit);
	const totalProducts = await getProductsCount(context);

	return { products, page, limit, totalProducts };
}

export default function ProductsPage() {
	const { products, page, limit, totalProducts } =
		useLoaderData<typeof loader>() ?? {};
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
			const ellipsisThreshold = 2;
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
		<div className="container mx-auto py-8">
			<h1 className="mb-8 flex items-center justify-between text-3xl font-bold text-[color:var(--theme-light,hsl(var(--zinc-800)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-100-dark)))]">
				<span>Products</span>
				<Link
					to="/add-product"
					className={cn(
						"inline-flex items-center rounded-lg px-4 py-2 text-lg font-semibold",
						"text-[color:var(--theme-light,hsl(var(--zinc-100)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-800-dark)))]",
						"bg-[color:var(--theme-light,hsl(var(--zinc-800)))] dark:bg-[color:var(--theme-dark,hsl(var(--zinc-100-dark)))]",
						"hover:bg-[color:var(--theme-light-hover,hsl(var(--zinc-700)))] dark:hover:bg-[color:var(--theme-dark-hover,hsl(var(--zinc-200-dark)))]",
						"focus:outline-none focus:ring-2 focus:ring-offset-2",
						"focus:ring-[color:var(--theme-light-focus,hsl(var(--zinc-500)))] dark:focus:ring-[color:var(--theme-dark-focus,hsl(var(--zinc-400-dark)))]"
					)}
				>
					<PlusCircledIcon className="mr-2 h-6 w-6" />
					Add New Product
				</Link>
			</h1>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<div key={product.id} className={themeBorder()}>
						<div className="relative">
							<img
								src="https://i.insider.com/60817ec5354dde0018c06960?width=700"
								alt={`Placeholder for ${product.name}`}
								className="h-48 w-full object-cover"
							/>
							<div className="absolute inset-0 flex bg-black bg-opacity-50 opacity-0 transition duration-300 hover:opacity-100">
								<Link
									to={`/products/edit/${product.id}?page=${page}`}
									className="group relative flex w-1/2 items-center justify-center border-r border-white"
								>
									<Pencil2Icon className="h-12 w-12 text-white" />
									<span className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-white group-hover:block">
										Edit
									</span>
								</Link>
								<Link
									to={`/products/delete/${product.id}?page=${page}`}
									className="group relative flex w-1/2 items-center justify-center"
								>
									<TrashIcon className="h-12 w-12 text-white" />
									<span className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-white group-hover:block">
										Delete
									</span>
								</Link>
							</div>
						</div>
						<div className="p-4">
							<h2 className="mb-2 text-xl font-bold text-[color:var(--theme-light,hsl(var(--zinc-800)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-100-dark)))]">
								{product.name}
							</h2>
							<p className="mb-4 text-[color:var(--theme-light,hsl(var(--zinc-600)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-400-dark)))]">
								{product.description}
							</p>
							<p className="text-lg font-bold text-[color:var(--theme-light,hsl(var(--zinc-800)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-100-dark)))]">
								Price: ${product.price}
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="mt-8">
				<Pagination>
					<PaginationContent>
						{page > 1 && (
							<PaginationItem>
								<PaginationPrevious
									href={`?page=${page - 1}`}
								/>
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
		</div>
	);
}
