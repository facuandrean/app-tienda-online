import express from 'express';
import { productController } from "../../controllers/productController";
import { productSchema, productUpdateSchema } from '../../schemas/productSchema';
import { validateBody } from '../../middlewares/validateBody';
import { checkRole } from '../../middlewares/checkRole';
import { verifyToken } from '../../middlewares/auth';

const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:productId", productController.getProductById);
productRoutes.post("/", verifyToken, checkRole(['Admin']), validateBody(false, productUpdateSchema, productSchema), productController.postProduct);
productRoutes.patch("/:productId", verifyToken, checkRole(['Admin']), validateBody(true, productUpdateSchema, productSchema), productController.putProduct);
productRoutes.delete("/:productId", verifyToken, checkRole(['Admin']), productController.deleteProduct);

export default productRoutes;
