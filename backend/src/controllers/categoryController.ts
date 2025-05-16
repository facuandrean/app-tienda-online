import type { Request, Response } from "express";
import { AppError } from "../errors";
import { categoryService } from "../services/categoryService";
import type { Category, CategoryInput, CategoryUpdateInput, CategoryWithoutId } from "../types/types";
import { getCurrentDate } from "../utils/dateUtils";


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

    const categoryId = req.params.categoryId as string;

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

    const date = getCurrentDate();

    const categoryData = req.body as CategoryInput;

    const newCategory: CategoryWithoutId = {
      ...categoryData,
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

    const date = getCurrentDate();

    const categoryId = req.params.categoryId as string;
    const updateData = req.body as CategoryUpdateInput;

    const category: Category | undefined = await categoryService.getCategoryById(categoryId);

    if (!category || category === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Category not found!' });
      return;
    };

    const newDataCategory = {
      ...category,
      ...updateData,
      updated_at: date
    };

    const updatedCategory: Category = await categoryService.putCategory(newDataCategory, categoryId);

    res.status(201).json({ status: 'Success', data: updatedCategory });
    return;

  } catch (error: unknown) {

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

    const categoryId = req.params.categoryId as string;

    const category: Category | undefined = await categoryService.getCategoryById(categoryId);

    if (!category || category === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Category not found!' });
      return;
    }

    await categoryService.deleteCategory(categoryId);

    res.status(201).json({ status: 'Success', data: 'Category successfully deleted' });
    return;

  } catch (error: unknown) {
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

