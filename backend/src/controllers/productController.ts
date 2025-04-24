import type { Request, Response } from "express";
import { productService } from "../services/productService";

import type { Product } from "../types/types";

const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const allProducts: Product[] = await productService.getAllProducts();

        res.status(200).json({ response: allProducts });
        return;
    } catch (error) {
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
    } catch (error) {
        res.status(500).json({ response: "Internal server error" });
        return;
    }

}

const postProduct = async (_req: Request, res: Response) => {
    const product = productService.postProduct();
    res.end("Post sussessfully!");
}

const putProduct = async (_req: Request, res: Response) => {
    const product = productService.putProduct();
    res.end("Put sussessfully!");
}

const deleteProduct = async (_req: Request, res: Response) => {
    const product = productService.deleteProduct();
    res.end("Delete sussessfully!");
}

export const productController = {
    getAllProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}
