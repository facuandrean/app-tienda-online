import type { Request, Response } from "express";
import { AppError } from "../errors";
import type { Product, ShoppingCart, ShoppingCartItem, ShoppingCartItemInput, ShoppingCartItemWithoutId, UserToken } from "../types/types";
import { shoppingCartService } from "../services/shoppingCartService";
import { getCurrentDate } from "../utils/dateUtils";
import { shoppingCartItemService } from "../services/shoppingCartItemService";
import { productService } from "../services/productService";


const addItemsToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getCurrentDate();

    const { user_id } = req.user as UserToken;

    const itemData = req.body as ShoppingCartItemInput;

    const product: Product | undefined = await productService.getProductById(itemData.product_id);

    if (!product) {
      throw new AppError('Product not found', 404);
    };

    if (product.stock - itemData.quantity < 0) {
      throw new AppError('Not enough stock available', 400);
    }

    if (itemData.quantity > 100) {
      throw new AppError('Quantity exceeds maximum allowed', 400);
    }

    const shoppingCart: ShoppingCart = await shoppingCartService.getShoppingCartByUserId(user_id);

    if (!shoppingCart) {
      throw new AppError('Shopping cart not found', 404);
    };

    const newItem: ShoppingCartItemWithoutId = {
      ...itemData,
      created_at: date,
      updated_at: date
    }

    const item: ShoppingCartItem = await shoppingCartItemService.addItemToCart(shoppingCart.shopping_cart_id, newItem);

    res.status(201).json({ status: 'Success', data: item });
    return;

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal server error' });
    return;
  }
}

export const shoppingCartItemController = {
  addItemsToCart
}