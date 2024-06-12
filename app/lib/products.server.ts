import { AppLoadContext } from "@remix-run/node";
import { product } from "@/db.server/schema";
import { eq, count } from "drizzle-orm";

export async function getAllProducts(
	{ DB }: AppLoadContext,
	page: number,
	limit: number
) {
	const offset = (page - 1) * limit;

	return await DB.query.product.findMany({
		columns: {
			id: true,
			name: true,
			description: true,
			price: true,
		},
		offset,
		limit,
	});
}

export async function getProductsCount({ DB }: AppLoadContext) {
	return await DB.select({ count: count() }).from(product);
}

export async function createProduct(
	{ DB }: AppLoadContext,
	productData: {
		name: string;
		description: string;
		price: number;
	}
) {
	return await DB.insert(product).values({
		name: productData.name,
		description: productData.description,
		price: productData.price,
	});
}

export async function deleteProduct({ DB }: AppLoadContext, productId: string) {
	return await DB.delete(product).where(eq(product.id, productId));
}

export async function getProductById(
	{ DB }: AppLoadContext,
	productId: string
) {
	return await DB.query.product.findFirst({
		where: eq(product.id, productId),
	});
}

export async function updateProduct(
	{ DB }: AppLoadContext,
	productData: {
		id: string;
		name: string;
		description: string;
		price: number;
	}
) {
	return await DB.update(product)
		.set({
			name: productData.name,
			description: productData.description,
			price: productData.price,
		})
		.where(eq(product.id, productData.id));
}
