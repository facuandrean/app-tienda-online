import type { Request, Response } from 'express';
import { AppError } from '../errors';
import { productCategoriesService } from '../services/productCategoriesService';

const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.categoryId as string;

    const productsByCategory = await productCategoriesService.getProductsByCategory(categoryId);

    if (!productsByCategory) {
      res.status(404).json({ status: 'Failed', data: 'Products by category not found!' });
      return;
    }

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


const getCategoriesByProduct = async (req: Request, res: Response): Promise<void> => {
  try {

    const productId = req.params.productId as string;

    const categoriesByProduct = await productCategoriesService.getCategoriesByProduct(productId);

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


const assignCategoryToProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, categoryId } = req.body;

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


const unassignCategoryFromProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, categoryId } = req.body;

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