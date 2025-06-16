import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { shoppingCarts } from "./shoppingCartsScheme";
import { products } from "./productsScheme";
import { sql } from "drizzle-orm";


export const shoppingCartItems = sqliteTable('shopping_cart_items', {
  cart_item_id: text('cart_item_id').primaryKey(),
  cart_id: text('cart_id').references(() => shoppingCarts.shopping_cart_id),
  product_id: text('product_id').references(() => products.product_id),
  quantity: integer('quantity').notNull(),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});