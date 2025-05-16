import { db } from "../database/database";
import { products } from "../database/db/productsScheme";
import { v4 as uuid } from "uuid";

import type { Product, ProductWithoutId, ProductUpdateInput } from "../types/types";
import { eq } from "drizzle-orm";
import { AppError } from "../errors";


/**
 * Retrieves all products from the database.
 * @returns {Promise<Product[]>} A promise that resolves to an array of all products.
 * @throws {AppError} Throws an error if there is an issue retrieving the products.
 */
const getAllProducts = async (): Promise<Product[]> => {
  try {

    const allProducts = await db.select().from(products).all();

    return allProducts;

  } catch (error) {
    throw new AppError("Error getting all products!", 404);
  }
}


/**
 * Retrieves a product by its ID.
 * @param {string} product_id - The ID of the product to retrieve.
 * @returns {Promise<Product | undefined>} A promise that resolves to the product if found, or undefined if not found.
 * @throws {AppError} Throws an error if there is an issue retrieving the product.
 */
const getProductById = async (product_id: string): Promise<Product | undefined> => {
  try {

    const product = await db.select().from(products).where(eq(products.product_id, product_id)).get();

    return product;

  } catch (error) {
    throw new AppError(`Error getting product by id ${product_id}`, 404);
  }
}


/**
 * Creates a new product in the database.
 * @param {ProductWithoutId} dataProduct - The product data without the ID.
 * @returns {Promise<Product>} A promise that resolves to the newly created product.
 * @throws {AppError} Throws an error if there is an issue creating the product.
 */
const postProduct = async (dataProduct: ProductWithoutId): Promise<Product> => {
  const newProduct = {
    product_id: uuid(),
    ...dataProduct
  }

  try {
    const product = await db.insert(products).values(newProduct).returning().get();
    return product;
  } catch (error) {
    throw new AppError("Error creating product!", 400);
  }
}


/**
 * Updates an existing product in the database.
 * @param {ProductUpdateInput} dataProduct - The updated product data.
 * @param {string} productId - The ID of the product to update.
 * @returns {Promise<Product>} A promise that resolves to the updated product.
 * @throws {AppError} Throws an error if there is an issue updating the product.
 */
const putProduct = async (dataProduct: ProductUpdateInput, productId: string): Promise<Product> => {
  try {
    const product = await db.update(products).set(dataProduct).where(eq(products.product_id, productId)).returning().get();
    return product;
  } catch (error) {
    throw new AppError("Error updating product!", 400);
  }
}


/**
 * Deletes a product from the database by its ID.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 * @throws {AppError} Throws an error if there is an issue deleting the product.
 */
const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await db.delete(products).where(eq(products.product_id, productId));
  } catch (error) {
    throw new AppError("Error deleting product!", 400);
  }
}

export const productService = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct
}