import { Input } from 'valibot';
import { productSchema, productUpdateSchema } from '../schemas/productSchema';
import { products } from '../database/db/productsScheme';
import { InferModel } from 'drizzle-orm';
import { categories } from '../database/db/categoriesScheme';
import type { categorySchema, categoryUpdateSchema } from '../schemas/categorySchema';
import type { users } from '../database/db/usersScheme';
import type { userLoginSchema, userSchema, userUpdateSchema } from '../schemas/userSchema';
import type { productCategories } from '../database/db/productCategoriesScheme';
import type { productCategorySchema, productCategoryUpdateSchema } from '../schemas/productCategorySchema';
import type { productCategoriesSchema, productCategoriesUpdateSchema } from '../schemas/productCategoriesSchema';
import type { uuidSchema } from '../schemas/uuidSchema';
import type { customers } from '../database/db/customersScheme';
import type { customerSchema, customerUpdateSchema } from '../schemas/customerSchema';
import type { shoppingCarts } from '../database/db/shoppingCartsScheme';
import type { shoppingCartsSchema } from '../schemas/shoppingCartsSchema';


export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type UUIDInput = Input<typeof uuidSchema>;

// InferModel is used to infer the type of the product from the database schema
export type Product = InferModel<typeof products>;

// Omit is used to omit the product_id from the product type
export type ProductWithoutId = Omit<Product, 'product_id'>;

// Input is used to infer the type of the product from the productSchema, which is used to validate the product data.
export type ProductInput = Input<typeof productSchema>;

// Input is used to infer the type of the product from the productUpdateSchema, which is used to validate the product update data.
export type ProductUpdateInput = Input<typeof productUpdateSchema>;


export type Category = InferModel<typeof categories>;

export type CategoryWithoutId = Omit<Category, 'category_id'>;

export type CategoryInput = Input<typeof categorySchema>;

export type CategoryUpdateInput = Input<typeof categoryUpdateSchema>;


export type ProductCategory = InferModel<typeof productCategories>;

export type ProductCategoryInput = Input<typeof productCategoriesSchema>;

export type ProductCategoryUpdateInput = Input<typeof productCategoriesUpdateSchema>;


export type User = InferModel<typeof users>;

export type UserWithoutId = Omit<User, 'user_id'>;

export type UserInput = Input<typeof userSchema>;

export type UserUpdateInput = Input<typeof userUpdateSchema>;

export type UserLoginInput = Input<typeof userLoginSchema>;

export type UserToken = Pick<User, 'user_id' | 'email' | 'role_user'>;


export type Customer = InferModel<typeof customers>;

export type CustomerWithoutId = Omit<Customer, 'customer_id'>;

export type CustomerInput = Input<typeof customerSchema>;

export type CustomerUpdateInput = Input<typeof customerUpdateSchema>;


export type ShoppingCart = InferModel<typeof shoppingCarts>;

export type ShoppingCartInput = Input<typeof shoppingCartsSchema>;