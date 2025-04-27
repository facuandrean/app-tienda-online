import { db } from "../database/database";
import { products } from "../database/db/productsScheme";
import { v4 as uuid } from "uuid";

import type { Product, ProductWithoutId } from "../types/types";
import { eq } from "drizzle-orm";
import { AppError } from "../errors";


const getAllProducts = async (): Promise<Product[]> => {
    try {

        const allProducts = await db.select().from(products).all();
    
        return allProducts;

    } catch (error) {
        throw new AppError("Error getting all products!", 404);
    }
}

const getProductById = async (product_id: string): Promise<Product | undefined> => {
    try {

        const product = await db.select().from(products).where(eq(products.product_id, product_id)).get();

        return product;

    } catch (error) {
        throw new AppError(`Error getting product by id ${product_id}`, 404);
    }
}

const postProduct = async (dataProduct: ProductWithoutId): Promise<Product> => {
    const newProduct = {
        product_id: uuid(),
        ...dataProduct
    }

    try {
        const product = await db.insert(products).values(newProduct).returning().get();
        return product;
    } catch (error) {
        throw new AppError("Error creating product!", 400);
    }
}

const putProduct = async (dataProduct: ProductWithoutId, productId: string): Promise<Product> => {
    try {
        
        const product = await db.update(products).set(dataProduct).where(eq(products.product_id, productId)).returning().get();

        return product;

    } catch (error) {
        throw new AppError("Error updating product!", 400);
    }
}

const deleteProduct = async (productId: string): Promise<void> => {
    try {
        await db.delete(products).where(eq(products.product_id, productId));
    } catch (error) {
        throw new AppError("Error deleting product!", 400);
    }
}

export const productService = {
    getAllProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}