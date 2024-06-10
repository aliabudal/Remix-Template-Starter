import { CardsPaymentMethod } from "@/components/payment";
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

export default function Payment() {
	return (
		<>
			<CardsPaymentMethod />
		</>
	);
}
