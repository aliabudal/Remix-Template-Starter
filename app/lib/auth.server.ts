import "dotenv/config";
import { AppLoadContext } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { GitHubStrategy } from "remix-auth-github";
import cryptoRandomString from "crypto-random-string";

import { DEFAULT_FAILURE_REDIRECT } from "@/config.shared";
import { type AuthorizedUser, loginFormSchema } from "@/lib/auth";
import { getCookieSessionStorage } from "@/lib/session.server";
import { getUserByEmail, getUserByLogin, createUser } from "@/lib/user.server";
import { PublicError } from "./forms.server";
import { UserRole } from "./enums";

function generateRandomPassword(length: number): string {
	return cryptoRandomString({ length, type: "ascii-printable" });
}

export function getAuthenticator(context: AppLoadContext) {
	const authenticator = new Authenticator<AuthorizedUser>(
		getCookieSessionStorage(context.SESSION_SECRET)
	);
	const clientID = process.env.clientID as string;
	const clientSecret = process.env.clientSecret as string;

	authenticator.use(
		new FormStrategy(async ({ form }) => {
			const parsed = await loginFormSchema.safeParse(form);
			if (!parsed.success) throw new Error(parsed.error.message);

			const user = await getUserByLogin(context, parsed.data);
			if (!user) throw new PublicError("Invalid email or password", 401);

			return { id: user.id, role: user.role as UserRole };
		}),
		"form"
	);

	authenticator.use(
		new GitHubStrategy(
			{
				clientID: clientID,
				clientSecret: clientSecret,
				callbackURL: "http://localhost:3000/auth/github/callback",
			},
			async ({ profile }) => {
				const email = profile.emails[0].value;
				let user = await getUserByEmail(context, email);

				if (!user) {
					// User not found, create a new account
					const displayName = profile.displayName;
					const fullName = profile.displayName;
					const password = generateRandomPassword(16);

					user = await createUser(context, {
						displayName,
						email,
						fullName,
						password,
						role: UserRole.Member,
					});

					if (!user) {
						throw new PublicError(
							"Failed to create user account",
							500
						);
					}
				}
				
				return { id: user.id, role: user.role as UserRole };
			}
		),
		"github"
	);

	return authenticator;
}

export function getUser(context: AppLoadContext, request: Request) {
	const authenticator = getAuthenticator(context);

	return authenticator.isAuthenticated(request);
}

export function requireUser(context: AppLoadContext, request: Request) {
	const url = new URL(request.url);
	const authenticator = getAuthenticator(context);

	return authenticator.isAuthenticated(request, {
		failureRedirect: `${DEFAULT_FAILURE_REDIRECT}?${new URLSearchParams({
			redirectTo: `${url.pathname}${url.search}`,
		}).toString()}`,
	});
}
