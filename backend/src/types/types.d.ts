import { Input } from 'valibot';
import { productSchema, productUpdateSchema } from '../schemas/productSchema';
import { products } from '../database/db/productsScheme';
import { InferModel } from 'drizzle-orm';
import { categories } from '../database/db/categoriesScheme';
import type { categorySchema, categoryUpdateSchema } from '../schemas/categorySchema';
import type { users } from '../database/db/usersScheme';
import type { userSchema, userUpdateSchema } from '../schemas/userSchema';
import type { productCategories } from '../database/db/productCategoriesScheme';
import type { productCategorySchema, productCategoryUpdateSchema } from '../schemas/productCategorySchema';


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

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export const isUUID = (value: string): value is UUID => {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(value);
};

export type ProductCategoryInput = Input<typeof productCategorySchema>;

export type ProductCategoryUpdateInput = Input<typeof productCategoryUpdateSchema>;


export type User = InferModel<typeof users>;

export type UserWithoutId = Omit<User, 'user_id'>;

export type UserInput = Input<typeof userSchema>;

export type UserUpdateInput = Input<typeof userUpdateSchema>;


export interface Customer {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  neighborhood: string;
  created_at: string;
}

export type CustomerWithoutId = Omit<Customer, 'customer_id'>;