import express from 'express';
import { productController } from "../../controllers/productController";
import { validateProduct } from '../../middlewares/validateProduct';

const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:productId", productController.getProductById);
productRoutes.post("/", validateProduct, productController.postProduct);
productRoutes.patch("/:productId", validateProduct, productController.putProduct);
productRoutes.delete("/:productId", productController.deleteProduct);

export default productRoutes;
