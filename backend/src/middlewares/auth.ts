import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

/**
 * Verifies the JWT token in the request cookies.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next function to call.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  console.log('Cookies recibidas:', req.cookies);
  console.log('Token recibido:', token);

  if (!token) {
    res.status(401).json({ status: 'Failed', data: 'Not authorized. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtAccessToken as string);
    console.log('Token decodificado:', decoded);

    // Asegurarnos de que req.body exista
    if (!req.body) {
      req.body = {};
    }

    req.body.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);

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