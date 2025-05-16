import express from 'express';
import { categoryController } from '../../controllers/categoryController';
import { validateCategory } from '../../middlewares/validateCategory';
const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", validateCategory, categoryController.postCategory);
categoryRouter.patch("/:categoryId", validateCategory, categoryController.putCategory);
categoryRouter.delete("/:categoryId", categoryController.deleteCategory);

export default categoryRouter;