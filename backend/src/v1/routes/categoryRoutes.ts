import express from 'express';
import { categoryController } from '../../controllers/categoryController';
import { validateBody } from '../../middlewares/validateBody';
import { categorySchema, categoryUpdateSchema } from '../../schemas/categorySchema';


const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", validateBody(false, categorySchema, categorySchema), categoryController.postCategory);
categoryRouter.patch("/:categoryId", validateBody(true, categoryUpdateSchema, categorySchema), categoryController.putCategory);
categoryRouter.delete("/:categoryId", categoryController.deleteCategory);

export default categoryRouter;