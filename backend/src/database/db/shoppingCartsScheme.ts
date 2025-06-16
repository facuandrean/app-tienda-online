import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./usersScheme";


export const shoppingCarts = sqliteTable('Shopping_Carts', {
  shopping_cart_id: text('shopping_cart_id').primaryKey().notNull(),
  user_id: text('user_id').notNull().references(() => users.user_id),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});