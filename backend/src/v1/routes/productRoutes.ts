import express from 'express';
import { productController } from "../../controllers/productController";
import { productSchema, productUpdateSchema } from '../../schemas/productSchema';
import { validateBody } from '../../middlewares/validateBody';

const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:productId", productController.getProductById);
productRoutes.post("/", validateBody(false, productUpdateSchema, productSchema), productController.postProduct);
productRoutes.patch("/:productId", validateBody(true, productUpdateSchema, productSchema), productController.putProduct);
productRoutes.delete("/:productId", productController.deleteProduct);

export default productRoutes;
