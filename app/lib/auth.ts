import { z } from "zod";
import { zfd } from "zod-form-data";
import { UserRole } from "@/lib/enums";

export type AuthorizedUser = {
	id: string;
	role: UserRole;
};

export const loginFormSchema = zfd.formData({
	email: z
		.string({ required_error: "Email is required" })
		.trim()
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z.string({ required_error: "Password is required" }),
});
