import { and, eq } from "drizzle-orm";
import { db } from "../database/database";
import { shoppingCartItems } from "../database/db/shoppingCartItemsScheme";
import { AppError } from "../errors"
import { v4 as uuid } from "uuid";
import type { ShoppingCartItem, ShoppingCartItemWithoutId } from "../types/types";
import { getCurrentDate } from "../utils/dateUtils";
import { products } from "../database/db/productsScheme";


const addItemToCart = async (cartId: string, dataItem: ShoppingCartItemWithoutId): Promise<ShoppingCartItem> => {
  try {

    // Iniciar transacción
    // Todas las operaciones de base de datos deben usar el objeto tx en lugar de db
    return await db.transaction(async (tx) => {

      // Verificar stock actual
      const product = await tx.select().from(products).where(eq(products.product_id, dataItem.product_id as string)).get();

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      const existingItem = await tx.select().from(shoppingCartItems)
        .where(and(
          eq(shoppingCartItems.cart_id, cartId),
          eq(shoppingCartItems.product_id, dataItem.product_id as string)
        )).get();

      let quantityToAdd = dataItem.quantity;

      if (existingItem) {
        // Si el item existe, la cantidad a agregar es la diferencia
        quantityToAdd = dataItem.quantity;
      }

      // Verificar si hay suficiente stock
      if (product.stock < quantityToAdd) {
        throw new AppError('Not enough stock available', 400);
      }

      // Actualizar el stock
      await tx.update(products)
        .set({
          stock: product.stock - quantityToAdd,
          updated_at: getCurrentDate()
        }).where(eq(products.product_id, dataItem.product_id as string));

      if (existingItem) {
        // Actualizar item existente
        const updatedItem = await tx.update(shoppingCartItems)
          .set({
            quantity: existingItem.quantity + dataItem.quantity,
            updated_at: getCurrentDate()
          }).where(eq(shoppingCartItems.cart_item_id, existingItem.cart_item_id)).returning().get();

        return updatedItem;
      } else {
        // Crear nuevo item
        const newItem = {
          cart_item_id: uuid(),
          ...dataItem
        }

        const item = await tx.insert(shoppingCartItems).values(newItem).returning().get();

        return item;
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to add item to cart', 500);
  }
}

export const shoppingCartItemService = {
  addItemToCart
}