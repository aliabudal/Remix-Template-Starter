import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/auth.server";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useActionData, Link } from "@remix-run/react";
import { createProduct } from "@/lib/products.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const user = await getUser(context, request);

	if (!user) {
		return redirect("/");
	}

	return { user };
}

export async function action({ request, context }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const price = parseFloat(formData.get("price") as string);

	try {
		const validatedData = formSchema.parse({ name, description, price });

		const product = await createProduct(context, validatedData);

		if (!product) {
			return { error: "Failed to create product" };
		}

		return redirect("/products");
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { errors: error.flatten().fieldErrors };
		}
		console.error("Error creating product:", error);
		return {
			error: "An unexpected error occurred while creating the product",
		};
	}
}

const formSchema = z.object({
	name: z.string().min(4, {
		message: "Product name must be at least 4 characters.",
	}),
	description: z.string().min(10, {
		message: "Product description must be at least 10 characters.",
	}),
	price: z.number().positive({
		message: "Price must be a positive number.",
	}),
});

export default function AddProductPage() {
	const actionData = useActionData<typeof action>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
		},
	});

	return (
		<main className="container py-8 md:py-16 lg:py-32">
			<Form method="post" {...form}>
				<Card className="mx-auto w-full max-w-screen-sm">
					<CardHeader className="space-y-1">
						<CardTitle>Add Product</CardTitle>
						<CardDescription>
							Enter the product details below to add a new
							product.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Product Name</Label>
							<Input
								id="name"
								placeholder="Enter product name"
								{...form.register("name")}
							/>
							{actionData &&
								"errors" in actionData &&
								actionData.errors?.name && (
									<div className="text-sm text-destructive">
										{actionData.errors.name.join(", ")}
									</div>
								)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">
								Product Description
							</Label>
							<Input
								id="description"
								placeholder="Enter product description"
								{...form.register("description")}
							/>
							{actionData &&
								"errors" in actionData &&
								actionData.errors?.description && (
									<div className="text-sm text-destructive">
										{actionData.errors.description.join(
											", "
										)}
									</div>
								)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="price">Price</Label>
							<Input
								id="price"
								type="number"
								placeholder="Enter price"
								{...form.register("price", {
									valueAsNumber: true,
								})}
							/>
							{actionData &&
								"errors" in actionData &&
								actionData.errors?.price && (
									<div className="text-sm text-destructive">
										{actionData.errors.price.join(", ")}
									</div>
								)}
						</div>
					</CardContent>
					<CardFooter>
						<div className="flex-1 space-y-4">
							<Button className="block w-full" type="submit">
								Add Product
							</Button>
						</div>
					</CardFooter>
				</Card>
			</Form>
			{actionData && "error" in actionData && (
				<p className="mt-4 text-center text-sm text-destructive">
					{actionData.error}
				</p>
			)}
			<div className="mt-4 text-center">
				<Link to="/products" className="text-blue-500 hover:underline">
					&larr; Back to Products
				</Link>
			</div>
		</main>
	);
}
