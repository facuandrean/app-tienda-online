import type { Request, Response } from "express";
import { AppError } from "../errors";
import type { Customer } from "../types/types";
import { customerService } from "../services/customerService";

/**
 * Obtiene todos los clientes registrados en el sistema
 * @param {Request} _req - Objeto de solicitud Express (no utilizado)
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} No retorna valor, envía la respuesta HTTP
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
 * Obtiene un cliente específico por su ID
 * @param {Request} req - Objeto de solicitud Express que contiene el ID del cliente en los parámetros
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} No retorna valor, envía la respuesta HTTP
 */
const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {

    const { customerId } = req.params;

    if (!customerId) {
      res.status(400).json({ status: 'Failed', data: 'The id of customer is required!' });
      return;
    }

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
    const dateUnformatted = new Date().toISOString();
    const dateFormatted = new Date(dateUnformatted);
    dateFormatted.setHours(dateFormatted.getHours() - 3);
    const date = dateFormatted.toISOString();

    const { name, email, phone, address, city, country, neighborhood } = req.body as Customer;

    if (!name || !email || !phone || !address || !city || !country || !neighborhood) {
      res.status(400).json({ status: 'Failed', data: "All fields are required!" });
      return;
    };

    const newCustomer = {
      name,
      email,
      phone,
      address,
      city,
      country,
      neighborhood,
      created_at: date
    }

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
 * Actualiza los datos de un cliente existente
 * @param {Request} req - Objeto de solicitud Express que contiene el ID del cliente en los parámetros y los nuevos datos en el cuerpo
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} No retorna valor, envía la respuesta HTTP
 */
const putCustomer = async (req: Request, res: Response): Promise<void> => {
  try {

    const { customerId } = req.params;

    if (!customerId) {
      res.status(400).json({ status: 'Failed', data: 'Customer id is required!' });
      return;
    }

    const customer = await customerService.getCustomerById(customerId);

    if (!customer || customer === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Customer not found!' });
      return;
    }

    const { name, email, phone, address, city, country, neighborhood } = req.body as Customer;

    const newDataCustomer = {
      name: name || customer.name,
      email: email || customer.email,
      phone: phone || customer.phone,
      address: address || customer.address,
      city: city || customer.city,
      country: country || customer.country,
      neighborhood: neighborhood || customer.neighborhood,
      created_at: customer.created_at
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


const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      res.status(400).json({ status: 'Failed', data: 'Customer id is required!' });
      return;
    }

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