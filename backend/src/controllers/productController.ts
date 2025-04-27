import type { Request, Response } from "express";
import { productService } from "../services/productService";

import type { Product } from "../types/types";
import { AppError } from "../errors";

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

const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {

        const { productId } =  req.params;

        if (!productId) {
            res.status(400).json({ status: 'Failed', data: "Product id is required!" });
            return;
        }
    
        const product: Product | undefined = await productService.getProductById(productId);

        if (!product || product === undefined) {
            res.status(404).json({ status: 'Failed', data: "Product not found!" });
            return;
        }
        
        res.status(200).json({ status: 'Success', data: product});
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

const postProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, stock, picture, category_id, featured, active } = req.body;

        if (!name || !description || price == null || stock == null || !category_id ||
            typeof featured !== "boolean" || typeof active !== "boolean") {
            res.status(400).json({ status: 'Failed', data: "All fields are required!" });
            return;
        }

        const newProduct = {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            picture,
            category_id,
            featured: Boolean(featured),
            active: Boolean(active)
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

const putProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({ status: 'Failed', data: "Product id is required!" });
            return;
        }

        const product: Product | undefined = await productService.getProductById(productId);

        if (!product) {
            res.status(404).json({ status: 'Failed', data: "Product not found!" });
            return;
        }

        const { name, description, price, stock, picture, category_id, featured, active } = req.body;

        if (!name || !description || price == null || stock == null || !category_id ||
            typeof featured !== "boolean" || typeof active !== "boolean") {
            res.status(400).json({ response: "All fields are required!" });
            return;
        }

        const newDataProduct = {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            picture,
            category_id,
            featured: Boolean(featured),
            active: Boolean(active)
        }

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

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({ status: 'Failed', data: "Product id is required!" });
            return;
        }

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
