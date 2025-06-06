import type { NextFunction, Request, Response } from "express";

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.user) {
      res.status(401).json({ status: 'Failed', data: 'Not authorized.' });
      return;
    }

    if (!roles.includes(req.body.user.role_user)) {
      res.status(403).json({ status: 'Failed', data: 'Access denied. Insufficient permissions.' });
      return;
    }

    next();
  };
}; 