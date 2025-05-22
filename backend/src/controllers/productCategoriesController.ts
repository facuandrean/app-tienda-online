import type { Request, Response } from 'express';
import { AppError } from '../errors';
import { productCategoriesService } from '../services/productCategoriesService';
import { isUUID, type Category, type Product } from '../types/types';

/**
 * Retrieves all products by category from the database.
 * 
 * @param req - The HTTP request object containing the category ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the list of products by category.
 */
const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.categoryId as string;

    const productsByCategory: Product[] = await productCategoriesService.getProductsByCategory(categoryId);

    res.status(200).json({ status: 'Success', data: productsByCategory });
    return;
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}


/**
 * Retrieves all categories by product from the database.
 * 
 * @param req - The HTTP request object containing the product ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the list of categories by product.
 */
const getCategoriesByProduct = async (req: Request, res: Response): Promise<void> => {
  try {

    const productId = req.params.productId as string;

    const categoriesByProduct: Category[] = await productCategoriesService.getCategoriesByProduct(productId);

    res.status(201).json({ status: 'Success', data: categoriesByProduct });
    return;
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}


/**
 * Assigns a category to a product in the database.
 * 
 * @param req - The HTTP request object containing the product ID and category ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and a message.
*/
const assignCategoryToProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId as string;
    const categoryId = req.params.categoryId as string;

    if (!isUUID(productId) || !isUUID(categoryId)) {
      res.status(400).json({ status: 'Failed', data: 'Invalid product or category ID' });
      return;
    }

    await productCategoriesService.assignCategoryToProduct(productId, categoryId);

    res.status(200).json({ status: 'Success', data: 'Category assigned to product successfully!' });
    return;

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}


/**
 * Unassigns a category from a product in the database.
 * 
 * @param req - The HTTP request object containing the product ID and category ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and a message.
 */
const unassignCategoryFromProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId as string;
    const categoryId = req.params.categoryId as string;

    if (!isUUID(productId) || !isUUID(categoryId)) {
      res.status(400).json({ status: 'Failed', data: 'Invalid product or category ID' });
      return;
    }

    await productCategoriesService.unassignCategoryFromProduct(productId, categoryId);

    res.status(200).json({ status: 'Success', data: 'Category unassigned from product successfully!' });
    return;
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message })
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

export default {
  getProductsByCategory,
  getCategoriesByProduct,
  assignCategoryToProduct,
  unassignCategoryFromProduct
};