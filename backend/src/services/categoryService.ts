import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { categories } from "../database/db/categoriesScheme";
import { AppError } from "../errors";
import type { Category, CategoryWithoutId } from "../types/types";
import { v4 as uuid } from "uuid";
import { products } from "../database/db/productsScheme";

const getAllCategories = async (): Promise<Category[]> => {
  try {

    const allCategories = await db.select().from(categories).all();

    return allCategories;

  } catch (error) {
    throw new AppError('Error getting all categories!', 404);
  }
}

const getCategoryById = async (categoryId: string): Promise<Category | undefined> => {
  try {

    const category = await db.select().from(categories).where(eq(categories.category_id, categoryId)).get();
    
    return category;
    
  } catch (error) {
    throw new AppError(`Error getting category by id ${categoryId}`, 404);
  }
}

const postCategory = async (dataCategory: CategoryWithoutId): Promise<Category> => {
  const newCategory = {
    category_id: uuid(),
    ...dataCategory
  }

  try {
    const category = await db.insert(categories).values(newCategory).returning().get();
    return category;
  } catch (error) {
    throw new AppError('Error creating category!', 400)
  }
}

const putCategory = async (dataCategory: CategoryWithoutId, categoryId: string): Promise<Category> => {
  try {

    const category = await db.update(categories).set(dataCategory).where(eq(categories.category_id, categoryId)).returning().get();

    return category;

  } catch (error) {
    throw new AppError('Error updating category!', 400)
  }
}

const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    const nulleable = await db.update(products).set({ category_id: null }).where(eq(products.category_id, categoryId));

    if (nulleable) {
      await db.delete(categories).where(eq(categories.category_id, categoryId));    
    } else {
      throw new AppError('Error updating foreign key', 400);
    }

  } catch (error: any) {
    throw new AppError(error, 400);
  }
}

export const categoryService = {
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory
};

