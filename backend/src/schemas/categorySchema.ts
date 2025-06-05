import { object, string, minLength, pipe, optional } from 'valibot';

// This schema is used to validate the category data when creating a new category.
export const categorySchema = object({
  name: pipe(string(), minLength(3, 'The name must be at least 3 characters long')),
  description: pipe(string(), minLength(10, 'The description must be at least 10 characters long')),
});

// This schema is used to validate the category update data when updating a category.
export const categoryUpdateSchema = object({
  name: optional(pipe(string(), minLength(3, 'The name must be at least 3 characters long'))),
  description: optional(pipe(string(), minLength(10, 'The description must be at least 10 characters long'))),
}); 