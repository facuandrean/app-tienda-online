import { db } from "../database/database";
import { AppError } from "../errors"
import { productCategories } from "../database/db/productCategoriesScheme";
import { and, eq } from "drizzle-orm";
import type { Category, Product } from "../types/types";
import { products } from "../database/db/productsScheme";
import { categories } from "../database/db/categoriesScheme";
import { productService } from "./productService";
import { categoryService } from "./categoryService";

/**
 * Retrieves all products by category from the database.
 * 
 * @param categoryId - The ID of the category to retrieve products from.
 * @returns A list of products by category.
 */
const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const allProducts: Product[] = await db.select({
      product_id: products.product_id,
      name: products.name,
      description: products.description,
      price: products.price,
      stock: products.stock,
      picture: products.picture,
      featured: products.featured,
      active: products.active,
      created_at: products.created_at,
      updated_at: products.updated_at
    })
      .from(products)
      .leftJoin(productCategories, eq(productCategories.product_id, products.product_id))
      .where(eq(productCategories.category_id, categoryId));
    return allProducts;
  } catch (error) {
    throw new AppError('Internal Server Error', 500);
  }
}

/**
 * Retrieves all categories by product from the database.
 * 
 * @param productId - The ID of the product to retrieve categories from.
 * @returns A list of categories by product.
 */
const getCategoriesByProduct = async (productId: string): Promise<Category[]> => {
  try {
    const allCategories: Category[] = await db.select({
      category_id: categories.category_id,
      name: categories.name,
      description: categories.description,
      created_at: categories.created_at,
      updated_at: categories.updated_at
    })
      .from(categories)
      .leftJoin(productCategories, eq(productCategories.category_id, categories.category_id))
      .where(eq(productCategories.product_id, productId));
    return allCategories;
  } catch (error) {
    throw new AppError('Internal Server Error', 500);
  }
}

/**
 * Assigns a category to a product in the database.
 * 
 * @param productId - The ID of the product to assign the category to.
 * @param categoryId - The ID of the category to assign to the product.
 * @returns A JSON response containing the status and a message.
 */
const assignCategoryToProduct = async (productId: string, categoryId: string) => {
  try {
    await db.insert(productCategories).values({ product_id: productId, category_id: categoryId });
  } catch (error) {
    throw new AppError('The category could not be assigned to the product', 400);
  }
}

/**
 * Updates the category of a product in the database.
 * 
 * @param productIdOld - The ID of the product to update the category of.
 * @param categoryIdOld - The ID of the category to update the product to.
 * @param productIdNew - The ID of the new product to update the category to.
 * @param categoryIdNew - The ID of the new category to update the product to.
 * @returns A JSON response containing the status and a message.
 */
const updateProductCategory = async (productIdOld: string, categoryIdOld: string, productIdNew: string, categoryIdNew: string) => {
  try {
    const product = await productService.getProductById(productIdOld);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const category = await categoryService.getCategoryById(categoryIdOld);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const currentRelation = await db.select().from(productCategories).where(and(eq(productCategories.product_id, productIdOld), eq(productCategories.category_id, categoryIdOld))).get();

    if (!currentRelation) {
      throw new AppError('Product is not assigned to any category', 404);
    }

    const newProduct = await productService.getProductById(productIdNew);
    if (!newProduct) {
      throw new AppError('Product not found', 404);
    }

    const newCategory = await categoryService.getCategoryById(categoryIdNew);
    if (!newCategory) {
      throw new AppError('Category not found', 404);
    }

    const newRelation = await db.select().from(productCategories).where(and(eq(productCategories.product_id, productIdNew), eq(productCategories.category_id, categoryIdNew))).get();

    if (newRelation) {
      throw new AppError('Product is already assigned to this category', 400);
    }

    await db.delete(productCategories).where(and(eq(productCategories.product_id, productIdOld), eq(productCategories.category_id, categoryIdOld)));

    await db.insert(productCategories).values({ product_id: productIdNew, category_id: categoryIdNew });

  } catch (error) {
    throw new AppError('The category could not be updated', 400);
  }
}


/**
 * Unassigns a category from a product in the database.
 * 
 * @param productId - The ID of the product to unassign the category from.
 * @param categoryId - The ID of the category to unassign from the product.
 * @returns A JSON response containing the status and a message.
 */
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
  updateProductCategory,
  unassignCategoryFromProduct
}