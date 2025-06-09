import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { users } from "../database/db/usersScheme";
import { AppError } from "../errors";
import type { UserToken, UserWithoutId } from "../types/types";
import type { User } from "../types/types";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils";


/**
 * Retrieves a user by their email address.
 * 
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user if found, or undefined if not found.
 */
const getUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
    return existingUser;
  } catch (error) {
    throw new AppError('Failed to get user by email', 400);
  }
}


/**
 * Registers a new user and hashes the password.
 * 
 * @param dataUser - The user data to register.
 * @returns A promise that resolves to the newly created user.
 */
const registerUser = async (dataUser: UserWithoutId): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(dataUser.password, 10);

    const newUser = {
      ...dataUser,
      user_id: uuid(),
      password: hashedPassword
    }

    const user = await db.insert(users).values(newUser).returning().get();
    return user;
  } catch (error) {
    throw new AppError('Failed to register a new user', 400);
  }
};


/**
 * Logs in a user and generates a JWT token.
 * 
 * @param password - The password of the user.
 * @param existingUser - The user to login.
 * @returns A promise that resolves to the user and token.
 */
const loginUser = async (password: string, existingUser: User): Promise<{ user: UserToken; token: string }> => {
  try {
    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      throw new AppError('Invalid password', 400);
    }

    const token = generateToken(existingUser);

    return {
      user: {
        email: existingUser.email,
        user_id: existingUser.user_id,
        role_user: existingUser.role_user
      },
      token
    };
  } catch (error) {
    throw new AppError('Failed to login', 400);
  }
}

export const userService = {
  getUserByEmail,
  registerUser,
  loginUser,
}



