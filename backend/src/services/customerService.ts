import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { customers } from "../database/db/customersScheme";
import { AppError } from "../errors";
import { v4 as uuid } from "uuid";
import type { Customer, CustomerWithoutId } from "../types/types";

/**
 * Get all customers.
 * @returns {Promise<Customer[]>} Array of customers
 */
const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const allCustomers = db.select().from(customers).all();
    return allCustomers;
  } catch (error) {
    throw new AppError('Error getting customers', 400);
  }
};

/**
 * Get a customer by id.
 * @param {string} customerId - The id of the customer
 * @returns {Promise<Customer | undefined>} The customer or undefined if not found
 */
const getCustomerById = async (customerId: string): Promise<Customer | undefined> => {
  try {
    const customer = await db.select().from(customers).where(eq(customers.customer_id, customerId)).get();

    return customer;
  } catch (error) {
    throw new AppError('Error getting customer by id ' + customerId, 404)
  }
}

/**
 * Create a new customer.
 * @param {CustomerWithoutId} dataCustomer - The data for the new customer, excluding its ID.
 * @returns {Promise<Customer>} A promise that resolves to the newly created customer.
 * @throws {AppError} Throws an error if there is an issue creating the customer.
 */
const postCustomer = async (dataCustomer: CustomerWithoutId): Promise<Customer> => {
  const newCustomer = {
    customer_id: uuid(),
    ...dataCustomer
  };

  try {
    const customer = await db.insert(customers).values(newCustomer).returning().get();
    return customer;
  } catch (error) {
    throw new AppError('Error creating the account of customer!', 400)
  }
}

/**
 * Update an existing customer.
 * @param {CustomerWithoutId} dataCustomer - The data for the customer to update.
 * @param {string} customerId - The id of the customer to update.
 * @returns {Promise<Customer>} A promise that resolves to the updated customer.
 * @throws {AppError} Throws an error if there is an issue updating the customer.
 */
const putCustomer = async (dataCustomer: CustomerWithoutId, customerId: string): Promise<Customer> => {
  try {
    const customer = await db.update(customers).set(dataCustomer).where(eq(customers.customer_id, customerId)).returning().get();
    return customer;
  } catch (error) {
    throw new AppError('Error updating the account of customer!', 400);
  }
}

/**
 * Delete a customer.
 * @param {string} customerId - The id of the customer to delete.
 * @returns {Promise<void>} A promise that resolves to the deleted customer.
 * @throws {AppError} Throws an error if there is an issue deleting the customer.
 */
const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    await db.delete(customers).where(eq(customers.customer_id, customerId));
  } catch (error) {
    throw new AppError('Error deleting the account of customer!', 400);
  }
}

export const customerService = {
  getAllCustomers,
  getCustomerById,
  postCustomer,
  putCustomer,
  deleteCustomer
}