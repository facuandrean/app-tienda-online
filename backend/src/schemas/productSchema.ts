import { object, string, number, boolean, minLength, minValue, maxValue, pipe, optional } from 'valibot';

// This schema is used to validate the product data.
export const productSchema = object({
  name: pipe(string(), minLength(3, 'The name must be at least 3 characters long')),
  description: pipe(string(), minLength(10, 'The description must be at least 10 characters long')),
  price: pipe(number(), minValue(0, 'The price cannot be negative')),
  stock: pipe(
    number(),
    minValue(0, 'The stock cannot be negative'),
    maxValue(10000, 'The stock cannot be greater than 10,000')
  ),
  picture: string(),
  featured: boolean(),
  active: boolean()
});

// This schema is used to validate the product update data.
export const productUpdateSchema = object({
  name: optional(pipe(string(), minLength(3, 'The name must be at least 3 characters long'))),
  description: optional(pipe(string(), minLength(10, 'The description must be at least 10 characters long'))),
  price: optional(pipe(number(), minValue(0, 'The price cannot be negative'))),
  stock: optional(pipe(
    number(),
    minValue(0, 'The stock cannot be negative'),
    maxValue(10000, 'The stock cannot be greater than 10,000')
  )),
  picture: optional(string()),
  featured: optional(boolean()),
  active: optional(boolean())
}); 