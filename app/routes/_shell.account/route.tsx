import { ArchiveIcon } from "@radix-ui/react-icons";
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
import {
	Form,
	useActionData,
	useLoaderData,
	useNavigation,
} from "@remix-run/react";

import { title } from "@/config.shared";
import { formIntent } from "@/lib/forms.server";

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
import { requireUser } from "@/lib/auth.server";
import { getUserById, updateUser } from "@/lib/user.server";
import { updateAccountFormSchema } from "./form";
import { useState } from "react";

enum Intents {
	UpdateAccount = "updateAccount",
}

export const meta: MetaFunction = () => {
	return [
		{ title: title("Account") },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
	const user = await requireUser(context, request);

	const account = await getUserById(context, user.id);

	return { account };
}

export async function action({ context, request }: ActionFunctionArgs) {
	const user = await requireUser(context, request);

	const formData = await request.formData();

	return formIntent(formData)
		.intent(
			Intents.UpdateAccount,
			updateAccountFormSchema,
			async (data) => {
				return await updateUser(context, user.id, user.role, data);
			}
		)
		.run();
}

export default function Account() {
	const navigation = useNavigation();
	const { account: loaderAccount } = useLoaderData<typeof loader>();
	const { updateAccount } = useActionData<typeof action>() ?? {};

	const account = updateAccount?.lastReturn ?? loaderAccount;

	const saving =
		navigation.state === "submitting" &&
		navigation.formData?.get("intent") === Intents.UpdateAccount;

	const formDisabled = saving;

	const [displayName, setDisplayName] = useState(account?.displayName || "");
	const [fullName, setFullName] = useState(account?.fullName || "");

	return (
		<main className="container py-8 md:py-16 lg:py-32">
			<Form method="POST" replace>
				<input
					type="hidden"
					name="intent"
					value={Intents.UpdateAccount}
				/>

				<Card className="mx-auto w-full max-w-screen-sm">
					<CardHeader className="space-y-1">
						<CardTitle>Account</CardTitle>
						<CardDescription>Edit your info below.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="displayName">Display Name</Label>
							<Input
								type="text"
								id="displayName"
								name="displayName"
								placeholder="Anonymous"
								required
								value={displayName}
								onChange={(e) => setDisplayName(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="fullName">Full Name</Label>
							<Input
								type="text"
								id="fullName"
								name="fullName"
								placeholder="John Doe"
								required
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="account-form-email">Email</Label>
							<Input
								id="account-form-email"
								defaultValue={account?.email}
								disabled
							/>
						</div>
					</CardContent>
					<CardFooter>
						<div className="flex-1 space-y-2">
							<Button
								className="block w-full"
								type="submit"
								disabled={formDisabled}
							>
								{saving ? (
									<span className="inline-flex items-center">
										Saving{" "}
										<ArchiveIcon className="ml-2 text-primary-foreground" />
									</span>
								) : (
									"Save"
								)}
							</Button>
						</div>
					</CardFooter>
				</Card>
			</Form>
		</main>
	);
}
