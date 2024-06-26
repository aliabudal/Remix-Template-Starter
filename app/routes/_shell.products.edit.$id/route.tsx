import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { Form, useLoaderData, Link, useActionData } from "@remix-run/react";
import { getProductById, updateProduct } from "@/lib/products.server";
import { themeBorder } from "@/lib/styles";
import { getUser } from "@/lib/auth.server";

export async function loader({ context, params, request }: LoaderFunctionArgs) {
	const productId = params.id;
	const url = new URL(request.url);
	const page = url.searchParams.get("page") || "1";

	if (!productId) {
		throw new Response("Product ID not provided", { status: 400 });
	}

	const product = await getProductById(context, productId);

	if (!product) {
		throw new Response("Product not found", { status: 404 });
	}

	return { product, page };
}

export async function action({ context, request, params }: ActionFunctionArgs) {
	const user = await getUser(context, request);
	if (!user || user.role !== "Administrator") {
		return {
			error: "Unauthorized: Only administrators can edit products (Security :P)",
		};
	}
	const productId = params.id;
	const url = new URL(request.url);
	const page = url.searchParams.get("page") || "1";

	if (!productId) {
		throw new Response("Product ID not provided", { status: 400 });
	}

	const formData = await request.formData();
	const name = formData.get("name");
	const description = formData.get("description");
	const price = formData.get("price");

	if (
		typeof name !== "string" ||
		typeof description !== "string" ||
		typeof price !== "string"
	) {
		throw new Response("Invalid form data", { status: 400 });
	}

	const updatedProduct = {
		id: productId,
		name,
		description,
		price: parseFloat(price),
	};

	await updateProduct(context, updatedProduct);

	return redirect(`/products?page=${page}`);
}

export default function EditProduct() {
	const actionData = useActionData<typeof action>();
	const { product, page } = useLoaderData<typeof loader>() ?? {};

	return (
		<div className="mx-auto mt-8 max-w-md">
			<div className={themeBorder()}>
				<h1 className="mb-4 text-2xl font-bold">Edit Product</h1>
				<Form method="post">
					<div className="mb-4">
						<label
							htmlFor="name"
							className="mb-1 block font-semibold"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							defaultValue={product.name}
							className="w-full rounded-lg border border-gray-300 px-3 py-2"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="description"
							className="mb-1 block font-semibold"
						>
							Description
						</label>
						<input
							id="description"
							name="description"
							defaultValue={product.description}
							className="w-full rounded-lg border border-gray-300 px-3 py-2"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="price"
							className="mb-1 block font-semibold"
						>
							Price
						</label>
						<input
							type="number"
							id="price"
							name="price"
							defaultValue={product.price}
							className="w-full rounded-lg border border-gray-300 px-3 py-2"
							required
						/>
					</div>
					{actionData?.error && (
						<p className="mb-4 text-red-500">{actionData.error}</p>
					)}
					<div className="flex justify-end">
						<button
							type="submit"
							className="rounded-lg bg-blue-500 px-4 py-2 text-white"
						>
							Update
						</button>
					</div>
				</Form>
			</div>
			<div className="mt-4 text-center">
				<Link
					to={`/products?page=${page}`}
					className="text-blue-500 hover:underline"
				>
					&larr; Back to Products
				</Link>
			</div>
			<div className="pb-4"></div>
		</div>
	);
}
