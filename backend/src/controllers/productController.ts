import type { Request, Response } from "express";
import { productService } from "../services/productService";

const getAllProducts = async (_req: Request, res: Response) => {
    const allProducts = await productService.getAllProducts();

    res.status(200).json({ data: allProducts, message: "All products" });
}

const getProductById = async (_req: Request, res: Response) => {
    const product = productService.getProductById();
    res.end("Get product by id!");
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
