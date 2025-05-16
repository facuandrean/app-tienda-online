import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { categories } from "../database/db/categoriesScheme";
import { AppError } from "../errors";
import type { Category, CategoryUpdateInput, CategoryWithoutId } from "../types/types";
import { v4 as uuid } from "uuid";
import { products } from "../database/db/productsScheme";


/**
 * Retrieves all categories from the database.
 * 
 * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
 * @throws {AppError} Throws an error if there is an issue retrieving the categories.
 */
const getAllCategories = async (): Promise<Category[]> => {
  try {

    const allCategories = await db.select().from(categories).all();

    return allCategories;

  } catch (error) {
    throw new AppError('Error getting all categories!', 404);
  }
}


/**
 * Retrieves a category by its ID.
 * 
 * @param {string} categoryId - The ID of the category to retrieve.
 * @returns {Promise<Category | undefined>} A promise that resolves to the category if found, or undefined if not.
 * @throws {AppError} Throws an error if there is an issue retrieving the category.
 */
const getCategoryById = async (categoryId: string): Promise<Category | undefined> => {
  try {

    const category = await db.select().from(categories).where(eq(categories.category_id, categoryId)).get();

    return category;

  } catch (error) {
    throw new AppError(`Error getting category by id ${categoryId}`, 404);
  }
}


/**
 * Creates a new category in the database.
 * 
 * @param {CategoryWithoutId} dataCategory - The data for the new category, excluding its ID.
 * @returns {Promise<Category>} A promise that resolves to the newly created category.
 * @throws {AppError} Throws an error if there is an issue creating the category.
 */
const postCategory = async (dataCategory: CategoryWithoutId): Promise<Category> => {
  const newCategory: Category = {
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


/**
 * Updates an existing category in the database.
 * 
 * @param {CategoryUpdateInput} dataCategory - The updated data for the category.
 * @param {string} categoryId - The ID of the category to update.
 * @returns {Promise<Category>} A promise that resolves to the updated category.
 * @throws {AppError} Throws an error if there is an issue updating the category.
 */
const putCategory = async (dataCategory: CategoryUpdateInput, categoryId: string): Promise<Category> => {
  try {
    const category = await db.update(categories).set(dataCategory).where(eq(categories.category_id, categoryId)).returning().get();
    return category;
  } catch (error) {
    throw new AppError('Error updating category!', 400)
  }
}


/**
 * Deletes a category from the database.
 * 
 * @param {string} categoryId - The ID of the category to delete.
 * @returns {Promise<void>} A promise that resolves when the category is deleted.
 * @throws {AppError} Throws an error if there is an issue deleting the category or updating foreign keys.
 */
const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    await db.delete(categories).where(eq(categories.category_id, categoryId));
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

