import { AppLoadContext } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";

import { password, user } from "@/db.server/schema";
import { UserRole } from "@/lib/enums";

export async function createUser(
	{ DB }: AppLoadContext,
	{
		displayName,
		email,
		fullName,
		password: unhashedPassword,
		role = UserRole.Member,
	}: {
		displayName: string;
		email: string;
		fullName: string;
		password: string;
		role?: UserRole;
	}
) {
	if (role === UserRole.Administrator) {
		throw new Error(
			"Unauthorized: Only direct database access can assign the Administrator role."
		);
	}
	try {
		const createdUser = (
			await DB.insert(user)
				.values({
					displayName,
					email,
					fullName,
					role,
				})
				.returning({
					id: user.id,
					displayName: user.displayName,
					email: user.email,
					fullName: user.fullName,
					role: user.role,
				})
		)[0];
		if (!createdUser) return null;

		try {
			const inserted = await DB.insert(password)
				.values({
					userId: createdUser.id,
					password: await bcrypt.hash(unhashedPassword, 11),
				})
				.returning({
					userId: password.userId,
				});
			if (inserted[0]?.userId !== createdUser.id)
				throw new Error("Failed to create user");
		} catch (reason) {
			console.error(reason);
			try {
				await DB.delete(user).where(eq(user.id, createdUser.id));
			} catch (cause) {
				throw new Error(
					"Failed to rollback user creation after password creation failed",
					{ cause }
				);
			}

			return null;
		}

		return createdUser;
	} catch (reason) {
		if (
			reason &&
			reason instanceof Error &&
			reason.message.includes("UNIQUE")
		) {
			return null;
		}
		throw reason;
	}
}

export async function getUserById({ DB }: AppLoadContext, userId: string) {
	return (
		(await DB.query.user.findFirst({
			columns: {
				id: true,
				displayName: true,
				email: true,
				fullName: true,
				role: true,
			},
			where: eq(user.id, userId),
		})) ?? null
	);
}

export async function getUserByLogin(
	{ DB }: AppLoadContext,
	{ email, password: unhashedPassword }: { email: string; password: string }
) {
	const foundUser = await DB.query.user.findFirst({
		columns: {
			id: true,
			displayName: true,
			email: true,
			fullName: true,
			role: true,
		},
		where: eq(user.email, email),
	});
	if (!foundUser) return null;

	const foundPassword = await DB.query.password.findFirst({
		columns: {
			password: true,
		},
		where: and(eq(password.userId, foundUser.id)),
	});
	if (!foundPassword) return null;

	const passwordMatch = await bcrypt.compare(
		unhashedPassword,
		foundPassword.password
	);
	if (!passwordMatch) return null;

	return foundUser;
}

export async function updateUser(
	{ DB }: AppLoadContext,
	userId: string,
	newRole: UserRole,
	{ displayName, fullName }: { displayName: string; fullName: string }
) {
	if (newRole === UserRole.Administrator) {
		throw new Error(
			"Unauthorized: Only direct database access can assign the Administrator role."
		);
	}
	return (
		(
			await DB.update(user)
				.set({
					displayName,
					fullName,
					role: newRole,
				})
				.where(eq(user.id, userId))
				.returning({
					id: user.id,
					displayName: user.displayName,
					email: user.email,
					fullName: user.fullName,
					role: user.role,
				})
		)[0] ?? null
	);
}
