import type { Request, Response } from "express";
import { AppError } from "../errors";
import { getCurrentDate } from "../utils/dateUtils";
import type { User, UserInput, UserWithoutId } from "../types/types";
import { userService } from "../services/userService";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const userData = req.body as UserInput;
    const role = userData.adminToken === process.env.ADMIN_TOKEN ? 'Admin' : 'Customer';

    const existingUser = await userService.getUserByEmail(userData.email);

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const date = getCurrentDate();

    const newUser: UserWithoutId = {
      ...userData,
      role_user: role,
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

    const existingUser = await userService.getUserByEmail(email);

    if (!existingUser) {
      throw new AppError('User not found or not exists', 400);
    }

    const user = await userService.loginUser(password, existingUser);

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


// const logoutUser = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     // Limpiar la cookie de sesión si existe
//     res.clearCookie('token');

//     // Si estás usando JWT en el header Authorization, podrías querer invalidar el token
//     // Esto requeriría mantener una lista negra de tokens en tu base de datos

//     res.status(200).json({
//       status: 'Success',
//       data: 'User logged out successfully'
//     });
//     return;

//   } catch (error) {
//     if (error instanceof AppError) {
//       res.status(error.statusCode).json({ status: 'Failed', data: error.message });
//       return;
//     }

//     res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
//     return;
//   }
// }

export const userController = {
  registerUser,
  loginUser,
  // logoutUser
}



