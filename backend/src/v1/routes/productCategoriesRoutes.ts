import { Router } from "express";
import productCategoriesController from "../../controllers/productCategoriesController";
import { verifyToken } from '../../middlewares/auth';
import { checkRole } from '../../middlewares/checkRole';
import { productCategoriesSchema, productCategoriesUpdateSchema } from "../../schemas/productCategoriesSchema";
import { validateBody } from "../../middlewares/validateBody";

const routerProductCategories = Router();

routerProductCategories.get('/categories/:categoryId/products', productCategoriesController.getProductsByCategory);
routerProductCategories.get('/products/:productId/categories', productCategoriesController.getCategoriesByProduct);
routerProductCategories.post('/', verifyToken, checkRole(['Admin']), validateBody(false, productCategoriesUpdateSchema, productCategoriesSchema), productCategoriesController.assignCategoryToProduct);
routerProductCategories.patch('/:productIdOld/:categoryIdOld', verifyToken, checkRole(['Admin']), validateBody(true, productCategoriesUpdateSchema, productCategoriesSchema), productCategoriesController.updateProductCategory);
routerProductCategories.delete('/products/:productId/categories/:categoryId', verifyToken, checkRole(['Admin']), productCategoriesController.unassignCategoryFromProduct);

export default routerProductCategories;