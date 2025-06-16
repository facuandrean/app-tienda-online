import { eq } from "drizzle-orm"
import { db } from "../database/database"
import { shoppingCarts } from "../database/db/shoppingCartsScheme"
import { AppError } from "../errors"
import type { ShoppingCart } from "../types/types"


const getShoppingCartByUserId = async (user_id: string): Promise<ShoppingCart> => {
  try {
    const shoppingCart = await db.select().from(shoppingCarts).where(eq(shoppingCarts.user_id, user_id)).get();

    if (!shoppingCart) {
      throw new AppError('Shopping cart not found', 404);
    }

    // Obtener los items del carrito
    // const items = await db.select().from(shoppingCartItems).where(eq(shoppingCartItems.cart_id, shoppingCart.shopping_cart_id)).all();

    // return {
    //   cart: shoppingCart,
    //   items: items
    // };

    return shoppingCart;
  } catch (error) {
    throw new AppError('Failed to get shopping cart', 500)
  }
}


export const shoppingCartService = {
  getShoppingCartByUserId
}