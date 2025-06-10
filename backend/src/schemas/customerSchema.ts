import { object, pipe, string, regex, minLength, maxLength, nonEmpty, optional, custom } from "valibot";
import { isUUID } from "../utils/uuid";

export const customerSchema = object({
  userId: pipe(
    string(),
    custom((input) => isUUID(input as string), 'Invalid user ID format')
  ),
  phone: pipe(
    string(),
    minLength(10, "The number must be at least 10 digits"),
    maxLength(15, "The number cannot have more than 15 digits"),
    regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number format")
  ),
  address: pipe(
    string(),
    nonEmpty("The address cannot be empty"),
    minLength(5, "The address must be at least 5 characters"),
    maxLength(100, "The address cannot have more than 100 characters"),
    regex(/^[a-zA-Z0-9\s.,#-]+$/, "The address can only contain letters, numbers, spaces and the characters .,#-")
  ),
  city: pipe(
    string(),
    nonEmpty("The city cannot be empty"),
    minLength(2, "The city must be at least 2 characters"),
    maxLength(50, "The city cannot have more than 50 characters"),
    regex(/^[a-zA-ZÀ-ÿ\s]+$/, "The city can only contain letters and spaces")
  ),
  country: pipe(
    string(),
    nonEmpty("The country cannot be empty"),
    minLength(2, "The country must be at least 2 characters"),
    maxLength(50, "The country cannot have more than 50 characters"),
    regex(/^[a-zA-ZÀ-ÿ\s]+$/, "The country can only contain letters and spaces")
  ),
  neighborhood: pipe(
    string(),
    nonEmpty("The neighborhood cannot be empty"),
    minLength(2, "The neighborhood must be at least 2 characters"),
    maxLength(50, "The neighborhood cannot have more than 50 characters"),
    regex(/^[a-zA-ZÀ-ÿ\s]+$/, "The neighborhood can only contain letters and spaces")
  )
});

export const customerUpdateSchema = object({
  userId: optional(pipe(
    string(),
    custom((input) => isUUID(input as string), 'Invalid user ID format')
  )),
  phone: optional(pipe(
    string(),
    minLength(10, "The number must be at least 10 digits"),
    maxLength(15, "The number cannot have more than 15 digits"),
    regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number format")
  )),
  address: optional(pipe(
    string(),
    nonEmpty("The address cannot be empty"),
    minLength(5, "The address must be at least 5 characters"),
    maxLength(100, "The address cannot have more than 100 characters"),
    regex(/^[a-zA-Z0-9\s.,#-]+$/, "The address can only contain letters, numbers, spaces and the characters .,#-")
  )),
  city: optional(pipe(
    string(),
    nonEmpty("The city cannot be empty"),
    minLength(2, "The city must be at least 2 characters"),
    maxLength(50, "The city cannot have more than 50 characters"),
    regex(/^[a-zA-ZÀ-ÿ\s]+$/, "The city can only contain letters and spaces")
  )),
  country: optional(pipe(
    string(),
    nonEmpty("The country cannot be empty"),
    minLength(2, "The country must be at least 2 characters"),
    maxLength(50, "The country cannot have more than 50 characters"),
    regex(/^[a-zA-ZÀ-ÿ\s]+$/, "The country can only contain letters and spaces")
  )),
  neighborhood: optional(pipe(
    string(),
    nonEmpty("The neighborhood cannot be empty"),
    minLength(2, "The neighborhood must be at least 2 characters"),
    maxLength(50, "The neighborhood cannot have more than 50 characters"),
    regex(/^[a-zA-ZÀ-ÿ\s]+$/, "The neighborhood can only contain letters and spaces")
  ))
});