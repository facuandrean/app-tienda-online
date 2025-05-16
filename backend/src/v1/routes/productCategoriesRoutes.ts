import { Router } from "express";
import productCategoriesController from "../../controllers/productCategoriesController";

const routerProductCategories = Router();

routerProductCategories.get('/products/:productId/categories', productCategoriesController.getCategoriesByProduct);
routerProductCategories.get('/categories/:categoryId/products', productCategoriesController.getProductsByCategory);
routerProductCategories.post('/products/:productId/categories/:categoryId', productCategoriesController.assignCategoryToProduct);
routerProductCategories.delete('/products/:productId/categories/:categoryId', productCategoriesController.unassignCategoryFromProduct);

export default routerProductCategories;