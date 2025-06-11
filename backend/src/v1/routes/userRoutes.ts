import { Router } from "express";
import { userController } from "../../controllers/userController";
import { validateBody } from "../../middlewares/validateBody";
import { userLoginSchema, userSchema, userUpdateSchema } from "../../schemas/userSchema";
import { verifyToken } from "../../middlewares/auth";
import { checkRole } from "../../middlewares/checkRole";
import { checkOwnership } from "../../middlewares/checkOwnership";

const userRouter = Router();

userRouter.post("/signup", validateBody(false, userSchema, userSchema), userController.registerUser);
userRouter.post("/signin", validateBody(false, userLoginSchema, userLoginSchema), userController.loginUser);
userRouter.post("/logout", userController.logoutUser);

userRouter.get("/", verifyToken, checkRole(["Admin"]), userController.getAllUsers);

userRouter.get("/profile/:userId", verifyToken, checkRole(["Admin", "Customer"]), checkOwnership, userController.getUserById);
userRouter.patch("/profile/:userId", verifyToken, checkRole(["Admin", "Customer"]), checkOwnership, validateBody(true, userUpdateSchema, userSchema), userController.updateUserProfile);

userRouter.delete("/:userId", verifyToken, checkRole(["Admin"]), userController.deleteUser);

export default userRouter;