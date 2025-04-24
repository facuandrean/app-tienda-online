import { db } from "../database/database";
import { products } from "../database/db/productsScheme";
import { v4 as uuid } from "uuid";

import type { Product } from "../types/types";
import { eq } from "drizzle-orm";


const getAllProducts = async (): Promise<Product[]> => {
    const allProducts = await db.select().from(products).all();

    return allProducts;
}

const getProductById = async (product_id: string): Promise<Product | undefined> => {
    const product = await db.select().from(products).where(eq(products.product_id, product_id));

    return product.length > 0 ? product[0] : undefined;
}

const postProduct = async () => {
    return;
}

const putProduct = async () => {
    return;
}

const deleteProduct = async () => {
    return;
}

export const productService = {
    getAllProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}