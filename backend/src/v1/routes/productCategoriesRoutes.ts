import { Router } from "express";
import productCategoriesController from "../../controllers/productCategoriesController";
import { verifyToken } from '../../middlewares/auth';
import { checkRole } from '../../middlewares/checkRole';

const routerProductCategories = Router();

routerProductCategories.get('/categories/:categoryId/products', productCategoriesController.getProductsByCategory);
routerProductCategories.get('/products/:productId/categories', productCategoriesController.getCategoriesByProduct);
routerProductCategories.post('/', verifyToken, checkRole(['Admin']), productCategoriesController.assignCategoryToProduct);
// agregar actualización de categoria.
routerProductCategories.delete('/products/:productId/categories/:categoryId', verifyToken, checkRole(['Admin']), productCategoriesController.unassignCategoryFromProduct);

export default routerProductCategories;