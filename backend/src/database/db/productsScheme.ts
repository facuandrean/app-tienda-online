import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const products = sqliteTable('products', {
  product_id: text('product_id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  picture: text('picture'),
  featured: integer('featured', { mode: 'boolean' }).notNull(),
  active: integer('active', { mode: 'boolean' }).notNull(),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});