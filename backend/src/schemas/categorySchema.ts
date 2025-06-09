import { object, string, minLength, pipe, optional, regex } from 'valibot';

/**
 * This schema is used to validate the category data when creating a new category.
 * @property {string} name - The name of the category.
 * @property {string} description - The description of the category.
 */
export const categorySchema = object({
  name: pipe(
    string(),
    minLength(3, 'The name must be at least 3 characters long'),
    regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'The name can only contain letters and spaces')
  ),
  description: pipe(
    string(),
    minLength(10, 'The description must be at least 10 characters long'),
    regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'The description can only contain letters and spaces')
  ),
});

/**
 * This schema is used to validate the category update data when updating a category.
 * @property {string} name - The name of the category.
 * @property {string} description - The description of the category.
 */
export const categoryUpdateSchema = object({
  name: optional(
    pipe(
      string(),
      minLength(3, 'The name must be at least 3 characters long'),
      regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'The name can only contain letters and spaces')
    )
  ),
  description: optional(
    pipe(
      string(),
      minLength(10, 'The description must be at least 10 characters long'),
      regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'The description can only contain letters and spaces')
    )
  ),
}); 