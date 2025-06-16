import { Router } from "express";
import { verifyToken } from "../../middlewares/auth";
import { checkRole } from "../../middlewares/checkRole";
import { checkOwnership } from "../../middlewares/checkOwnership";
import { shoppingCartController } from "../../controllers/shoppingCartController";


const shoppingCartRoutes = Router();

shoppingCartRoutes.get('/', verifyToken, checkRole(['Admin', 'Customer']), checkOwnership, shoppingCartController.getShoppingCartByUserId);

export default shoppingCartRoutes;