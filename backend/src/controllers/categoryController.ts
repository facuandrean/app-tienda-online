import type { Request, Response } from "express";
import { AppError } from "../errors";
import { categoryService } from "../services/categoryService";
import type { Category } from "../types/types";

const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {

    const categories: Category[] = await categoryService.getAllCategories();

    res.status(200).json({ status: 'Success', data: categories });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: "Internal Server Error" });
    return;

  }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {

    const { categoryId } = req.params;

    if (!categoryId) {
      res.status(400).json({ status: 'Failed', data: "Category id is required!" });
      return;
    }

    const category: Category | undefined = await categoryService.getCategoryById(categoryId);

    if (!category || category === undefined) {
      res.status(404).json({ status: 'Failed', data: "Category not found!" });
      return;
    }

    res.status(200).json({ status: 'Success', data: category });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: "Internal Server Error" });
    return;

  }
};

const postCategory = async (req: Request, res: Response): Promise<void> => {
  try {

    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ status: 'Failed', data: "All fields are required!"});
      return;
    }

    const newCategory = {
      name,
      description
    };

    const category: Category = await categoryService.postCategory(newCategory);

    res.status(201).json({ status: 'Success', data: category });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: "Internal Server Error" });
    return;

  }
};

const putCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { categoryId } = req.params;

    if (!categoryId) {
      res.status(400).json({ status: 'Failed', data: 'Category id is required!'});
      return;
    };

    const category: Category | undefined = await categoryService.getCategoryById(categoryId);

    if (!category || category === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Category not found!'});
      return;
    };

    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ status: 'Failed', data: 'All fields are required!'});
      return;
    };

    const newDataCategory = {
      name,
      description
    };

    const updatedCategory: Category = await categoryService.putCategory(newDataCategory, categoryId);

    res.status(201).json({ status: 'Success', data: updatedCategory });
    return;

  } catch (error) {
    
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;

  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { categoryId } = req.params;
    
    if (!categoryId) {
      res.status(400).json({ status: 'Failed', data: 'Category id is required!'});
      return;
    }

    const category: Category | undefined = await categoryService.getCategoryById(categoryId);

    if (!category || category === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Category not found!'});
      return;
    }

    await categoryService.deleteCategory(categoryId);

    res.status(201).json({ status: 'Success', data: 'Category successfully deleted'});
    return;

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
};

export const categoryController = {
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory
};

