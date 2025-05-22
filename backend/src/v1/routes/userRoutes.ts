import { Router } from "express";
import { userController } from "../../controllers/userController";
import { validateBody } from "../../middlewares/validateBody";
import { userSchema, userUpdateSchema } from "../../schemas/userSchema";

const userRouter = Router();

userRouter.post("/register", validateBody(false, userUpdateSchema, userSchema), userController.registerUser);
userRouter.post("/signin", validateBody(false, userUpdateSchema, userSchema), userController.loginUser);

export default userRouter;