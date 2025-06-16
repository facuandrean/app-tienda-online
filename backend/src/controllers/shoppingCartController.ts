import type { Request, Response } from "express";
import { AppError } from "../errors";
import type { UserToken } from "../types/types";
import { shoppingCartService } from "../services/shoppingCartService";


const getShoppingCartByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.user as UserToken;

    const shoppingCart = await shoppingCartService.getShoppingCartByUserId(user_id);

    if (!shoppingCart) {
      res.status(200).json({
        status: 'Success',
        data: {
          cart: null,
          items: []
        }
      });
      return;
    }

    // res.status(200).json({ status: 'Success', data: { cart: shoppingCart.shopping_cart_id, items: shoppingCart.items } });
    res.status(200).json({ status: 'Success', data: shoppingCart });
    return;

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }
    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  };
}

export const shoppingCartController = {
  getShoppingCartByUserId
}