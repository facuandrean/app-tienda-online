import { object, string, number, boolean, minLength, minValue, maxValue, pipe, optional } from 'valibot';

/**
 * This schema is used to validate the product data.
 * @property {string} name - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 * @property {number} stock - The stock of the product.
 * @property {string} picture - The picture of the product.
 * @property {boolean} featured - Whether the product is featured.
 * @property {boolean} active - Whether the product is active.
 */
export const productSchema = object({
  name: pipe(string(), minLength(3, 'The name must be at least 3 characters long')),
  description: pipe(string(), minLength(10, 'The description must be at least 10 characters long')),
  price: pipe(number(), minValue(0, 'The price cannot be negative')),
  stock: pipe(
    number(),
    minValue(0, 'The stock cannot be negative'),
    maxValue(10000, 'The stock cannot be greater than 10,000')
  ),
  picture: optional(string()),
  featured: boolean(),
  active: boolean()
});

/**
 * This schema is used to validate the product update data.
 * @property {string} name - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 * @property {number} stock - The stock of the product.
 * @property {string} picture - The picture of the product.
 * @property {boolean} featured - Whether the product is featured.
 * @property {boolean} active - Whether the product is active.
 */
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