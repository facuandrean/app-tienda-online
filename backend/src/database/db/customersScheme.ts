import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./usersScheme";


export const customers = sqliteTable('customers', {
  customer_id: text('customer_id').primaryKey().notNull(),
  user_id: text('user_id').references(() => users.user_id),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  neighborhood: text('neighborhood').notNull(),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});