import { Router } from "express";
import { verifyToken } from "../../middlewares/auth";
import { checkRole } from "../../middlewares/checkRole";
import { checkOwnership } from "../../middlewares/checkOwnership";
import { shoppingCartItemController } from "../../controllers/shoppingCartItemController";
import { validateBody } from "../../middlewares/validateBody";
import { shoppingCartItemsSchema } from "../../schemas/shoppingCartItemsSchema";


const shoppingCartItemsRouter = Router();

shoppingCartItemsRouter.post('/', verifyToken, checkRole(['Admin', 'Customer']), checkOwnership, validateBody(false, shoppingCartItemsSchema, shoppingCartItemsSchema), shoppingCartItemController.addItemsToCart);
// shoppingCartItemsRouter.put('/:cartItemId', verifyToken, checkRole(['Admin', 'Customer']), checkOwnership, shoppingCartItemsController.updateItemQuantity);
// shoppingCartItemsRouter.delete('/:cartItemId', verifyToken, checkRole(['Admin', 'Customer']), checkOwnership, shoppingCartItemsController.removeItemFromCart);
// shoppingCartItemsRouter.delete('/', verifyToken, checkRole(['Admin', 'Customer']), checkOwnership, shoppingCartItemsController.clearCart);

export default shoppingCartItemsRouter;