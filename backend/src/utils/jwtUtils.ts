import jwt from 'jsonwebtoken';
import type { User, UserToken } from '../types/types';
import config from '../config';

/**
 * Generates a JWT token for a user.
 * 
 * @param user - The user to generate the token for.
 * @returns The generated JWT token.
 */
export const generateToken = (user: User): string => {
  const payload: UserToken = {
    user_id: user.user_id,
    email: user.email,
    role_user: user.role_user
  };

  return jwt.sign(payload, config.jwtAccessToken as string, { expiresIn: '1h' });
};