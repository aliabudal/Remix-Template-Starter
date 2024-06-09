import { getAuthenticator } from "@/lib/auth.server";
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { Faq } from "@/components/faq";
import { Pricing } from "@/components/pricing";

export const loader: LoaderFunction = async ({ context, request }) => {
	const authenticator = getAuthenticator(context);
	const user = await authenticator.isAuthenticated(request);

	if (!user) {
		return redirect("/");
	}

	return json({ user });
};

export default function Home() {
	return (
        <>
            <Pricing />
            <Faq />
        </>
	);
}
