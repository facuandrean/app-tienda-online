import type { Request, Response } from "express";
import { productService } from "../services/productService";

import type { Product, ProductWithoutId, ProductInput, ProductUpdateInput } from "../types/types";
import { AppError } from "../errors";
import { getCurrentDate } from "../utils/dateUtils";

/**
 * Retrieves all products from the database.
 *
 * @param _req - The HTTP request object (not used in this function).
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the list of all products.
 */
const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {

    const allProducts: Product[] = await productService.getAllProducts();

    res.status(200).json({ status: 'Success', data: allProducts });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: "Internal server error" });
    return;

  }
}


/**
 * Retrieves a product by its ID.
 *
 * @param req - The HTTP request object containing the product ID in the route parameters.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the product data, or an error message if the product is not found.
 */
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {

    const productId = req.params.productId as string;

    const product: Product | undefined = await productService.getProductById(productId);

    if (!product || product === undefined) {
      res.status(404).json({ status: 'Failed', data: "Product not found!" });
      return;
    }

    res.status(200).json({ status: 'Success', data: product });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: "Internal server error" });
    return;

  }
}


/**
 * Creates a new product in the database.
 *
 * @param req - The HTTP request object containing the product data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the newly created product data.
 */
const postProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getCurrentDate();
    const productData = req.body as ProductInput;

    const newProduct: ProductWithoutId = {
      ...productData,
      created_at: date,
      updated_at: date
    }

    const product: Product = await productService.postProduct(newProduct);

    res.status(201).json({ status: 'Success', data: product });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ response: error.message });
      return;
    }

    res.status(500).json({ response: "Internal server error" });
    return;

  }
}


/**
 * Updates an existing product in the database.
 *
 * @param req - The HTTP request object containing the product ID in the route parameters and the updated product data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the updated product data, or an error message if the product is not found.
 */
const putProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getCurrentDate();
    const productId = req.params.productId as string;
    const updateData = req.body as ProductUpdateInput;

    const product: Product | undefined = await productService.getProductById(productId);

    if (!product) {
      res.status(404).json({ status: 'Failed', data: "Product not found!" });
      return;
    }

    const newDataProduct = {
      ...product,
      ...updateData,
      updated_at: date
    };

    const updatedProduct: Product = await productService.putProduct(newDataProduct, productId);

    res.status(200).json({ status: 'Success', data: updatedProduct });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }
    res.status(500).json({ status: 'Failed', data: "Internal server error" });
    return;

  }
}


/**
 * Deletes a product from the database by its ID.
 *
 * @param req - The HTTP request object containing the product ID in the route parameters.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and a success message, or an error message if the product is not found.
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {

    const productId = req.params.productId as string;

    const product: Product | undefined = await productService.getProductById(productId);

    if (!product) {
      res.status(404).json({ status: 'Failed', data: "Product not found!" });
      return;
    }

    await productService.deleteProduct(productId);

    res.status(200).json({ status: 'Success', data: "Product deleted successfully!" });
    return;

  } catch (error: unknown) {

    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }
    res.status(500).json({ status: 'Failed', data: "Internal server error" });
    return;

  }
};

export const productController = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct
}
