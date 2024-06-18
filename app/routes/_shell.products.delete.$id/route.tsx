import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { Form, useLoaderData, Link, useActionData } from "@remix-run/react";
import { getProductById, deleteProduct } from "@/lib/products.server";
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
			error: "Unauthorized: Only administrators can delete products (Security :P)",
		};
	}
	const productId = params.id;
	const url = new URL(request.url);
	const page = url.searchParams.get("page") || "1";

	if (!productId) {
		throw new Response("Product ID not provided", { status: 400 });
	}

	const formData = await request.formData();
	const confirmation = formData.get("confirmation");

	if (confirmation === "yes") {
		await deleteProduct(context, productId);
	}

	return redirect(`/products?page=${page}`);
}

export default function DeleteProductConfirmation() {
	const actionData = useActionData<typeof action>();
	const { product, page } = useLoaderData<typeof loader>();

	return (
		<div className="mx-auto mt-8 max-w-md">
			<div className={themeBorder()}>
				<h1 className="mb-4 text-2xl font-bold">Delete Product</h1>
				<p className="mb-4 text-gray-600">
					Are you sure you want to delete the following product?
				</p>
				<div className={themeBorder("mb-6", "p-4")}>
					<img
						src="https://image-placeholder.com/images/actual-size/480x320.png"
						alt={`Placeholder for ${product.name}`}
						className="h-48 w-full object-cover"
					/>
					<p className="text-lg font-semibold">{product.name}</p>
					<p className="text-gray-600">{product.description}</p>
					<p className="mt-2 text-xl font-bold">
						${product.price.toFixed(2)}
					</p>
				</div>
				{actionData?.error && (
					<p className="mb-4 text-red-500">{actionData.error}</p>
				)}
				<Form method="post" className="flex justify-end">
					<Link
						to={`/products?page=${page}`}
						className="mr-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
					>
						Cancel
					</Link>
					<button
						type="submit"
						name="confirmation"
						value="yes"
						className="rounded-lg bg-red-500 px-4 py-2 text-white"
					>
						Delete
					</button>
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
