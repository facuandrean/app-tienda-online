import { custom, object, pipe, string } from "valibot";
import { isUUID } from "../utils/uuid";


export const shoppingCartsSchema = object({
  user_id: pipe(
    string(),
    custom((input) => isUUID(input as string), 'Invalid user ID format')
  )
});