import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { users } from "../database/db/usersScheme";
import { AppError } from "../errors";
import type { UserWithoutId } from "../types/types";
import type { User } from "../types/types";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const registerUser = async (dataUser: UserWithoutId): Promise<User> => {

  try {

    const existingUser = await db.select().from(users).where(eq(users.email, dataUser.email));

    if (existingUser.length > 0) {
      throw new AppError('User already exists', 400);
    }

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

const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user) {
      throw new AppError('User not found or not exists', 400);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError('Invalid password', 400);
    };

    return { email: user.email, user_id: user.user_id } = user;
  } catch (error) {
    throw new AppError('Failed to login', 400);
  }
}

export const userService = {
  registerUser,
  loginUser,
}



