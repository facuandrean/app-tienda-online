import type { Request, Response } from "express";
import { AppError } from "../errors";
import { getCurrentDate } from "../utils/dateUtils";
import type { User, UserInput, UserWithoutId } from "../types/types";
import { userService } from "../services/userService";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getCurrentDate();

    const userData = req.body as UserInput;

    const newUser: UserWithoutId = {
      ...userData,
      created_at: date,
      updated_at: date
    }

    const user: User = await userService.registerUser(newUser);

    res.status(201).json({ status: 'Success', data: user });
    return;

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as UserInput;

    const user = await userService.loginUser(email, password);

    res.status(200).json({ status: 'Success', data: user })

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

export const userController = {
  registerUser,
  loginUser,
}



