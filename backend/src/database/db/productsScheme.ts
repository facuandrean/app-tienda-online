import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import { categories } from './categoriesScheme';

export const products = sqliteTable('products', {
  product_id: text('product_id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  picture: text('picture'),
  category_id: text('category_id').references(() => categories.category_id, {
    onDelete: "set null",
    onUpdate: "cascade"
  }),
  featured: integer('featured', { mode: 'boolean' }).notNull(),
  active: integer('active', { mode: 'boolean' }).notNull()
});