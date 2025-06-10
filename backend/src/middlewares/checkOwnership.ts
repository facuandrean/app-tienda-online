import type { Request, Response, NextFunction } from 'express';
import { db } from '../database/database';
import { customers } from '../database/db/customersScheme';
import { eq } from 'drizzle-orm';

export const checkOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const customerId = req.params.customerId as string;
    const userId = req.body.user?.user_id as string;

    if (req.body.user?.role_user === 'Admin') {
      next();
      return;
    }

    const customer = await db.select().from(customers).where(eq(customers.customer_id, customerId)).get();

    if (!customer) {
      res.status(404).json({ status: 'Failed', data: 'Customer not found' });
      return;
    }

    if (customer.user_id !== userId) {
      res.status(403).json({ status: 'Failed', data: 'You do not have permission to access this resource' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ status: 'Failed', data: 'Error verifying resource ownership' });
  }
}; 