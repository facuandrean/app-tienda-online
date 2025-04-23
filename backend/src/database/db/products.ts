import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  product_id: text('product_id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  stock: integer('stock'),
  picture: text('picture'),
  category_id: text('category_id'),
  featured: integer('featured', { mode: 'boolean' }),
  active: integer('active', { mode: 'boolean' })
});