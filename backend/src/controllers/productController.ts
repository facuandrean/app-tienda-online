import type { Request, Response } from "express";
import { productService } from "../services/productService";

import type { Product } from "../types/types";
import { AppError } from "../errors";

const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
    try {

        const allProducts: Product[] = await productService.getAllProducts();

        if (allProducts.length === 0) {
            res.status(404).json({ response: "No products found." });
            return;
        }

        res.status(200).json({ response: allProducts });
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

const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {

        const { productId } =  req.params;

        if (!productId) {
            res.status(400).json({ response: "Product id is required!" });
            return;
        }
    
        const product: Product | undefined = await productService.getProductById(productId);

        if (!product) {
            res.status(404).json({ response: "Product not found!" });
            return;
        }
        
        res.status(200).json({ response: product});

    } catch (error: unknown) {
        
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ response: error.message });
            return;
        }

        res.status(500).json({ response: "Internal server error" });
        return;

    }
}

const postProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, stock, picture, category_id, featured, active } = req.body;

        if (!name || !description || price == null || stock == null || !category_id ||
            typeof featured !== "boolean" || typeof active !== "boolean") {
            res.status(400).json({ response: "All fields are required!" });
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

        const product = await productService.postProduct(newProduct);

        res.status(201).json({ response: product });
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
            res.status(400).json({ response: "Product id is required!" });
            return;
        }

        const product: Product | undefined = await productService.getProductById(productId);

        if (!product) {
            res.status(404).json({ response: "Product not found!" });
            return;
        }

        const { name, description, price, stock, picture, category_id, featured, active } = req.body;

        if (!name || !description || price == null || stock == null || !category_id ||
            typeof featured !== "boolean" || typeof active !== "boolean") {
            res.status(400).json({ response: "All fields are required!" });
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

        const updatedProduct = await productService.putProduct(newProduct, productId);

        res.status(200).json({ response: updatedProduct });
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

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { productId } = req.params;

        if (!productId) {
            res.status(400).json({ response: "Product id is required!" });
            return;
        }

        const product: Product | undefined = await productService.getProductById(productId);

        if (!product) {
            res.status(404).json({ response: "Product not found!" });
            return;
        }

        await productService.deleteProduct(productId);

        res.status(200).json({ response: "Product deleted successfully!" });
        return;

    } catch (error: unknown) {

        if (error instanceof AppError) {
            res.status(error.statusCode).json({ response: error.message });
            return;
        }
        res.status(500).json({ response: "Internal server error" });
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
