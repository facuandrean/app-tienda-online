import type { Request, Response } from "express";
import { AppError } from "../errors";
import type { Customer, CustomerInput, CustomerUpdateInput, CustomerWithoutId } from "../types/types";
import { customerService } from "../services/customerService";
import { getCurrentDate } from "../utils/dateUtils";

/**
 * Get all customers.
 * @param {Request} _req - Express request object (not used)
 * @param {Response} res - Express response object
 * @returns {Promise<void>} No return value, sends HTTP response
 */
const getAllCustomers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const customers: Customer[] = await customerService.getAllCustomers();

    res.status(200).json({ status: 'Success', data: customers });
    return;
  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
};


/**
 * Get a customer by id.
 * @param {Request} req - Express request object that contains the customer id in the parameters
 * @param {Response} res - Express response object
 * @returns {Promise<void>} No return value, sends HTTP response
 */
const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {

    const customerId = req.params.customerId as string;

    const customer: Customer | undefined = await customerService.getCustomerById(customerId);

    if (!customer || customer === undefined) {
      res.status(404).json({ status: 'Failed', data: "Customer not found!" });
      return;
    }

    res.status(200).json({ status: 'Success', data: customer });
    return;

  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

/**
 * Crea un nuevo cliente en el sistema
 * @param {Request} req - Objeto de solicitud Express que contiene los datos del cliente en el cuerpo
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} No retorna valor, envía la respuesta HTTP
 */
const postCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getCurrentDate();

    const customerData = req.body as CustomerInput;

    const newCustomer: CustomerWithoutId = {
      ...customerData,
      created_at: date,
      updated_at: date
    };

    const customer: Customer = await customerService.postCustomer(newCustomer);

    res.status(201).json({ status: 'Success', data: customer });
    return;

  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

/**
 * Update the data of an existing customer.
 * @param {Request} req - Express request object that contains the customer id in the parameters and the new data in the body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} No return value, sends HTTP response
 */
const putCustomer = async (req: Request, res: Response): Promise<void> => {
  try {

    const date = getCurrentDate();

    const customerId = req.params.customerId as string;

    const customer = await customerService.getCustomerById(customerId);

    if (!customer || customer === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Customer not found!' });
      return;
    }

    const customerData = req.body as CustomerUpdateInput;

    const newDataCustomer = {
      ...customer,
      ...customerData,
      updated_at: date
    }

    const updatedCustomer = await customerService.putCustomer(newDataCustomer, customerId);

    res.status(201).json({ status: 'Success', data: updatedCustomer });
    return;

  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

/**
 * Delete a customer.
 * @param {Request} req - Express request object that contains the customer id in the parameters
 * @param {Response} res - Express response object
 * @returns {Promise<void>} No return value, sends HTTP response
 */
const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.params.customerId as string;

    const customer: Customer | undefined = await customerService.getCustomerById(customerId);

    if (!customer || customer === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Customer not found!' });
      return;
    }

    await customerService.deleteCustomer(customerId);

    res.status(200).json({ status: 'Success', data: 'Customer deleted successfully!' });
    return;

  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

export const customerController = {
  getAllCustomers,
  getCustomerById,
  postCustomer,
  putCustomer,
  deleteCustomer
}