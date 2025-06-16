import { custom, minValue, maxValue, number, object, optional, pipe, string } from "valibot";
import { isUUID } from "../utils/uuid";


export const shoppingCartItemIdSchema = object({
  cart_item_id: pipe(
    string(),
    custom((input) => isUUID(input as string), 'Invalid cart item ID format')
  )
});

export const shoppingCartItemsSchema = object({
  product_id: pipe(
    string(),
    custom((input) => isUUID(input as string), 'Invalid product ID format')
  ),
  quantity: pipe(
    number(),
    minValue(1, 'Quantity must be at least 1'),
    maxValue(100, 'Quantity cannot exceed 100')
  )
});

export const shoppingCartItemsUpdateSchema = object({
  quantity: optional(
    pipe(
      number(),
      minValue(1, 'Quantity must be at least 1'),
      maxValue(100, 'Quantity cannot exceed 100')
    )
  )
});