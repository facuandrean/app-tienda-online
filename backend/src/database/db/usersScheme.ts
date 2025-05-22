import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  user_id: text('user_id').primaryKey().notNull(),
  name: text('name').notNull(),
  lastname: text('lastname').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role_user: text('role_user').notNull().default('Customer'),
  is_active: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  last_login: text('last_login'),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)
})