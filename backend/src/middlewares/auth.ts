import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import type { UserToken } from "../types/types";

/**
 * Verifies the JWT token in the request cookies.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next function to call.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ status: 'Failed', data: 'Not authorized. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtAccessToken as string) as UserToken;

    req.user = decoded;
    next();

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ status: 'Failed', data: 'Token expired.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ status: 'Failed', data: 'Invalid token.' });
    } else {
      res.status(401).json({ status: 'Failed', data: 'Authentication failed.' });
    }
    return;
  }
};