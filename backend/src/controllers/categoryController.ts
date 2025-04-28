import type { Request, Response } from "express";
import { AppError } from "../errors";
import { categoryService } from "../services/categoryService";
import type { Category } from "../types/types";


/**
 * Retrieves all categories from the database.
 * 
 * @param _req - The HTTP request object (not used in this function).
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the list of categories.
 */
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


/**
 * Retrieves a specific category by its ID.
 * 
 * @param req - The HTTP request object containing the category ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the category data, or an error message if not found.
 */
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


/**
 * Creates a new category in the database.
 * 
 * @param req - The HTTP request object containing the category data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the newly created category.
 */
const postCategory = async (req: Request, res: Response): Promise<void> => {
  try {

    const dateUnformatted = new Date().toISOString();
    const dateFormatted = new Date(dateUnformatted);
    dateFormatted.setHours(dateFormatted.getHours() - 3);
    const date = dateFormatted.toISOString();

    const { name, description } = req.body as Category;

    if (!name || !description) {
      res.status(400).json({ status: 'Failed', data: "All fields are required!"});
      return;
    }

    const newCategory = {
      name,
      description,
      created_at: date,
      updated_at: date
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


/**
 * Updates an existing category in the database.
 * 
 * @param req - The HTTP request object containing the category ID in the params and updated data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the updated category, or an error message if not found.
 */
const putCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const dateUnformatted = new Date().toISOString();
    const dateFormatted = new Date(dateUnformatted);
    dateFormatted.setHours(dateFormatted.getHours() - 3);
    const date = dateFormatted.toISOString();

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

    const { name, description } = req.body as Category;

    if (!name || !description) {
      res.status(400).json({ status: 'Failed', data: 'All fields are required!'});
      return;
    };

    const newDataCategory = {
      name,
      description,
      updated_at: date
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

/**
 * Deletes a category from the database.
 * 
 * @param req - The HTTP request object containing the category ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and a success message, or an error message if not found.
 */
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

