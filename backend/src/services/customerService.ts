import { db } from "../database/database";
import { customers } from "../database/db/customerScheme";
import { AppError } from "../errors";
import type { Customer } from "../types/types";

const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const allCustomers = db.select().from(customers).all();
    return allCustomers;
  } catch (error) {
    throw new AppError('Error getting customers', 400);
  }
};

export const customerService = {
  getAllCustomers
}