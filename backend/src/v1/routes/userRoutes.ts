import { Router } from "express";
import { userController } from "../../controllers/userController";
import { validateBody } from "../../middlewares/validateBody";
import { userSchema, userUpdateSchema } from "../../schemas/userSchema";

const userRouter = Router();

userRouter.post("/singup", validateBody(false, userUpdateSchema, userSchema), userController.registerUser);
userRouter.post("/signin", validateBody(false, userUpdateSchema, userSchema), userController.loginUser);
// userRouter.post("/logout", userController.logoutUser);

export default userRouter;