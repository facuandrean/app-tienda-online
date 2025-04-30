import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";


export const customers = sqliteTable('customers', {
  customer_id: text('customer_id').primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  neighborhood: text('neighborhood').notNull(),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});