import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
    category_id: text("category_id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description").notNull()
})