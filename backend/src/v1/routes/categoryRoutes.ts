import express from 'express';
import { categoryController } from '../../controllers/categoryController';
import { validateBody } from '../../middlewares/validateBody';
import { categorySchema, categoryUpdateSchema } from '../../schemas/categorySchema';
import { verifyToken } from '../../middlewares/auth';
import { checkRole } from '../../middlewares/checkRole';


const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", verifyToken, checkRole(['Admin']), validateBody(false, categorySchema, categorySchema), categoryController.postCategory);
categoryRouter.patch("/:categoryId", verifyToken, checkRole(['Admin']), validateBody(true, categoryUpdateSchema, categorySchema), categoryController.putCategory);
categoryRouter.delete("/:categoryId", verifyToken, checkRole(['Admin']), categoryController.deleteCategory);

export default categoryRouter;