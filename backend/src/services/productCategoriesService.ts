import { db } from "../database/database";
import { AppError } from "../errors"
import { productCategories } from "../database/db/productCategoriesScheme";
import { and, eq } from "drizzle-orm";

const getProductsByCategory = async (categoryId: string) => {
  try {
    const products = await db.select().from(productCategories).where(eq(productCategories.category_id, categoryId));
    return products;
  } catch (error) {
    throw new AppError('Internal Server Error', 500);
  }
}

const getCategoriesByProduct = async (productId: string) => {
  try {
    const categories = await db.select().from(productCategories).where(eq(productCategories.product_id, productId));
    return categories;
  } catch (error) {
    throw new AppError('Internal Server Error', 500);
  }
}

const assignCategoryToProduct = async (productId: string, categoryId: string) => {
  try {
    await db.insert(productCategories).values({ product_id: productId, category_id: categoryId });
  } catch (error) {
    throw new AppError('The category could not be assigned to the product', 400);
  }
}

const unassignCategoryFromProduct = async (productId: string, categoryId: string) => {
  try {
    await db.delete(productCategories).where(and(eq(productCategories.product_id, productId), eq(productCategories.category_id, categoryId)));
  } catch (error) {
    throw new AppError('The category could not be unassigned from the product', 400);
  }
}

export const productCategoriesService = {
  getProductsByCategory,
  getCategoriesByProduct,
  assignCategoryToProduct,
  unassignCategoryFromProduct
}