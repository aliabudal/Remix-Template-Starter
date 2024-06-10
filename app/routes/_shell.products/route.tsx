import { getUser } from "@/lib/auth.server";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const user = await getUser(context, request);

	if (!user) {
		return redirect("/");
	}

	return { user };
}

export default function ProductsPage() {
	return (
		<div>
			<h1>Products</h1>
			<ul></ul>
		</div>
	);
}
