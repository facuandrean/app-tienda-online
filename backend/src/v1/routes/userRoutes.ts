import { Router } from "express";
import { userController } from "../../controllers/userController";
import { validateBody } from "../../middlewares/validateBody";
import { userLoginSchema, userSchema, userUpdateSchema } from "../../schemas/userSchema";

const userRouter = Router();

userRouter.post("/signup", validateBody(false, userUpdateSchema, userSchema), userController.registerUser);
userRouter.post("/signin", validateBody(false, userUpdateSchema, userLoginSchema), userController.loginUser);
userRouter.post("/logout", userController.logoutUser);

export default userRouter;