import { redirect, ActionFunctionArgs } from "@remix-run/node";
import { getAuthenticator } from "@/lib/auth.server";

export async function loader() {
	return redirect("/");
}

export async function action({ context, request }: ActionFunctionArgs) {
	const authenticator = getAuthenticator(context);

	return authenticator.authenticate("github", request, {
		successRedirect: "/home",
		failureRedirect: "/",
	});
}
