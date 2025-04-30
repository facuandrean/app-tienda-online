import type { Request, Response } from "express";
import { AppError } from "../errors";
import type { Customer } from "../types/types";
import { customerService } from "../services/customerService";

const getAllCustomers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const customers: Customer[] = await customerService.getAllCustomers();

    res.status(200).json({ status: 'Success', data: customers});
    return;
  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error'});
    return;
  }
};


const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { customerId } = req.params;

    if (!customerId) {
      res.status(400).json({ status: 'Failed', data: 'The id of customer is required!'});
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

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error'});
    return;
  }
}

const postCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const dateUnformatted = new Date().toISOString();
    const dateFormatted = new Date(dateUnformatted);
    dateFormatted.setHours(dateFormatted.getHours() - 3);
    const date = dateFormatted.toISOString();

    const { name, email, phone, address, city, country, neighborhood } = req.body as Customer;

    if (!name || !email || !phone || !address || !city || !country || !neighborhood) {
      res.status(400).json({ status: 'Failed', data: "All fields are required!"});
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

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error'});
    return;
  }
}

const putCustomer = async (req: Request, res: Response): Promise<void> => {
  try {

    const { customerId } = req.params;

    if (!customerId) {
      res.status(400).json({ status: 'Failed', data: 'Customer id is required!'});
      return;
    }

    const customer = await customerService.getCustomerById(customerId);

    if (!customer || customer === undefined) {
      res.status(404).json({ status: 'Failed', data: 'Customer not found!'});
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

    res.status(201).json({ status: 'Success', data: updatedCustomer});
    return;

  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error'});
    return;
  }
}

export const customerController = {
  getAllCustomers,
  getCustomerById,
  postCustomer,
  putCustomer
}