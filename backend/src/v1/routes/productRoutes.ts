import express from 'express';
import { productController } from "../../controllers/productController";

const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:productId", productController.getProductById);
productRoutes.post("/", productController.postProduct);
productRoutes.put("/:productId", productController.putProduct);
productRoutes.delete("/:productId", productController.deleteProduct);

export default productRoutes;
