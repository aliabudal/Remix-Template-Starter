import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

const stringId = (name: string) =>
	text(name)
		.primaryKey()
		.notNull()
		.$defaultFn(() => uuid());

export const password = sqliteTable("password", {
	id: stringId("id"),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	password: text("password").notNull(),
});

export const user = sqliteTable("user", {
	id: stringId("id"),
	email: text("email").unique().notNull(),
	fullName: text("full_name").notNull(),
	displayName: text("display_name").notNull(),
});

export const product = sqliteTable("product", {
	id: stringId("id"),
	name: text("name").notNull(),
	description: text("description").notNull(),
	price: integer("price").notNull(),
});

const schema = {
	password,
	user,
	product,
};

export default schema;

export type DB = LibSQLDatabase<typeof schema>;
