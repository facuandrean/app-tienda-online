import { db } from "../database/database";
import { products } from "../database/db/products";

const getAllProducts = async () => {
    const allProducts = await db.select().from(products).all();

    return allProducts;
}

const getProductById = async () => {
    return;
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