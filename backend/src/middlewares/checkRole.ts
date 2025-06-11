import type { NextFunction, Request, Response } from "express";

/**
 * Checks if the user has the required role to access the resource.
 * 
 * @param roles - The roles that are allowed to access the resource.
 * @returns A middleware function that checks if the user has the required role.
 */
export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ status: 'Failed', data: 'Not authorized.' });
      return;
    }

    if (!roles.includes(req.user.role_user)) {
      res.status(403).json({ status: 'Failed', data: 'Access denied. Insufficient permissions.' });
      return;
    }

    next();
  };
}; 