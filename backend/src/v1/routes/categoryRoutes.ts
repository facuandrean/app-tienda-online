import express from 'express';
import { categoryController } from '../../controllers/categoryController';

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", categoryController.postCategory);
categoryRouter.patch("/:categoryId", categoryController.putCategory);
categoryRouter.delete("/:categoryId", categoryController.deleteCategory);

export default categoryRouter;