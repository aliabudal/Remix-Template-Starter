import { getUser } from "@/lib/auth.server";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { CardsPaymentMethod } from "@/components/payment";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const user = await getUser(context, request);

	if (!user) {
		return redirect("/");
	}

	return { user };
}

export default function Payment() {
	return (
		<>
			<CardsPaymentMethod />
		</>
	);
}
