import { getAuthenticator } from "@/lib/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const authenticator = getAuthenticator(context);

	return authenticator.authenticate("github", request, {
		successRedirect: "/home",
		failureRedirect: "/",
	});
}
