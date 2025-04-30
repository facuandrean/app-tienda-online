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

export const customerController = {
  getAllCustomers
}