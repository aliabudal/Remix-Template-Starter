import { getUser } from "@/lib/auth.server";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Faq } from "@/components/faq";
import { Pricing } from "@/components/pricing";
import { HowItWorks } from "@/components/how-it-works";
import { UsedByClients } from "@/components/used-by-clients";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const user = await getUser(context, request);

	if (!user) {
		return redirect("/");
	}

	return { user };
}

export default function Home() {
	return (
		<>
			<Pricing />
			<HowItWorks />
			<UsedByClients />
			<Faq />
		</>
	);
}
