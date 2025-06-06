import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// import type { UserToken } from "../types/types";
import config from "../config";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ status: 'Failed', data: 'Not authorized.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtAccessToken as string);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('jwt');
    res.status(401).json({ status: 'Failed', data: 'Invalid token.' });
    return;
  }
};