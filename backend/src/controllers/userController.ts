import type { Request, Response } from "express";
import { AppError } from "../errors";
import { getCurrentDate } from "../utils/dateUtils";
import type { User, UserInput, UserLoginInput, UserUpdateInput, UserWithoutId } from "../types/types";
import { userService } from "../services/userService";
import config from "../config";


/**
 * Registers a new user.
 * 
 * @param req - The HTTP request object containing the user data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the newly created user data.
 */
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const userData = req.body as UserInput;
    const role = userData.adminToken === config.adminToken ? 'Admin' : 'Customer';

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

/**
 * Logs in a user and generates a JWT token.
 * 
 * @param req - The HTTP request object containing the user data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the user data.
 */
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as UserLoginInput;

    const existingUser = await userService.getUserByEmail(email);

    if (!existingUser) {
      throw new AppError('User not found or not exists', 400);
    }

    const { user, token } = await userService.loginUser(password, existingUser);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 60 * 60 * 1000, // 1 hora
      path: '/' // Asegurarse de que la cookie esté disponible en todas las rutas
    });

    res.status(200).json({
      status: 'Success',
      data: {
        user,
        message: 'Login successful'
      }
    });

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ status: 'Failed', data: error.message });
      return;
    }

    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
    return;
  }
}

/**
 * Logs out a user by clearing the JWT cookie.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and a message.
 */
const logoutUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({
      status: 'Success',
      data: { message: 'Logout successful' }
    });
  } catch (error) {
    res.status(500).json({ status: 'Failed', data: 'Internal Server Error' });
  }
}


/**
 * Gets all users.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the user data.
 */
const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userService.getAllUsers();

    res.status(200).json({ status: 'Success', data: users });
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


/**
 * Gets a user by their ID.
 * 
 * @param req - The HTTP request object containing the user ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the user data.
 */
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;

    const profile: User | undefined = await userService.getUserById(userId);

    if (!profile) {
      throw new AppError('An error occurred while getting the user profile', 400);
    }

    res.status(200).json({ status: 'Success', data: profile });
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


/**
 * Updates a user's profile.
 * 
 * @param req - The HTTP request object containing the user data in the body.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and the updated user data.
 */
const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = getCurrentDate();

    const userId = req.params.userId as string;

    const user = req.body as UserUpdateInput;

    const userProfile: User | undefined = await userService.getUserById(userId);

    if (!userProfile) {
      throw new AppError('User not found or not exists', 400);
    }

    const newDataUser = {
      ...userProfile,
      ...user,
      updated_at: date
    }

    const updatedUser: User = await userService.updateUser(newDataUser, userId);

    res.status(200).json({ status: 'Success', data: updatedUser });
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

/**
 * Deletes a user by their ID.
 * 
 * @param req - The HTTP request object containing the user ID in the params.
 * @param res - The HTTP response object.
 * @returns A JSON response containing the status and a message.
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId as string;

    await userService.deleteUser(userId);

    res.status(200).json({ status: 'Success', data: { message: 'User deleted successfully' } });
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

export const userController = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUser
}



