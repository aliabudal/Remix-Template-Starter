import { getAuthenticator } from "@/lib/auth.server";
import { LoaderFunction, redirect, json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ context, request }) => {
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);

	if (!user) {
		return redirect("/");
	}

	return json({ user });
};

export default function ProductsPage() {
	return (
		<div>
			<h1>Products</h1>
			<ul></ul>
		</div>
	);
}
