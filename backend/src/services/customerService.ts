import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { customers } from "../database/db/customersScheme";
import { AppError } from "../errors";
import { v4 as uuid } from "uuid";
import type { Customer, CustomerWithoutId } from "../types/types";


const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const allCustomers = db.select().from(customers).all();
    return allCustomers;
  } catch (error) {
    throw new AppError('Error getting customers', 400);
  }
};

const getCustomerById = async (customerId: string): Promise<Customer | undefined> => {
  try {
    const customer = db.select().from(customers).where(eq(customers.customer_id, customerId)).get();

    return customer;
  } catch (error) {
    throw new AppError('Error getting customer by id ' + customerId, 404)
  }
}

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

const putCustomer = async (dataCustomer: CustomerWithoutId, customerId: string): Promise<Customer> => {
  try {
    const customer = await db.update(customers).set(dataCustomer).where(eq(customers.customer_id, customerId)).returning().get();
    return customer;
  } catch (error) {
    throw new AppError('Error updating the account of customer!', 400);
  }
}

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