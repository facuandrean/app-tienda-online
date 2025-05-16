import { Input } from 'valibot';
import { productSchema, productUpdateSchema } from '../schemas/productSchema';
import { products } from '../database/db/productsScheme';
import { InferModel } from 'drizzle-orm';
import { categories } from '../database/db/categoriesScheme';
import type { categorySchema, categoryUpdateSchema } from '../schemas/categorySchema';


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