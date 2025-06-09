import { email, minLength, object, pipe, regex, string, optional, custom } from "valibot";
import config from "../config";

/**
 * Schema for validating user creation data
 * @property {string} name - User's first name (min 3 chars, letters and spaces only)
 * @property {string} lastname - User's last name (min 3 chars, letters and spaces only)
 * @property {string} email - User's email address (must be valid format)
 * @property {string} password - User's password (min 8 chars, must contain uppercase, lowercase, number and special char)
 * @property {string} [adminToken] - Optional token for admin registration, must match ADMIN_TOKEN from env
 */
export const userSchema = object({
  name: pipe(
    string(),
    minLength(3, 'Name must be at least 3 characters long'),
    regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Name can only contain letters and spaces')
  ),
  lastname: pipe(
    string(),
    minLength(3, 'Lastname must be at least 3 characters long'),
    regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Lastname can only contain letters and spaces')
  ),
  email: pipe(
    string(),
    email('Invalid email'),
    regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
  ),
  password: pipe(
    string(),
    minLength(8, 'Password must be at least 8 characters long'),
    regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  ),
  // Custom: method to validate if the admin token is valid. Its work with the config.adminToken, if the token is valid, the user will be created as an admin.
  adminToken: optional(
    pipe(
      string()
    )
  )
})

/**
 * Schema for validating user update data
 * All fields are optional and follow the same validation rules as userSchema
 * @property {string} [name] - Optional update for user's first name
 * @property {string} [lastname] - Optional update for user's last name
 * @property {string} [password] - Optional update for user's password
 */
export const userUpdateSchema = object({
  name: optional(
    pipe(
      string(),
      minLength(3, 'Name must be at least 3 characters long'),
      regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Name can only contain letters and spaces')
    )
  ),
  lastname: optional(
    pipe(
      string(),
      minLength(3, 'Lastname must be at least 3 characters long'),
      regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Lastname can only contain letters and spaces')
    )
  ),
  password: optional(
    pipe(
      string(),
      minLength(8, 'Password must be at least 8 characters long'),
      regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    )
  )
})

/**
 * Schema for validating user login data
 * @property {string} email - User's email address (must be valid format)
 * @property {string} password - User's password (min 8 chars, must contain uppercase, lowercase, number and special char)
 */
export const userLoginSchema = object({
  email: pipe(
    string(),
    email('Invalid email'),
    regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
  ),
  password: pipe(
    string()
  ),
})