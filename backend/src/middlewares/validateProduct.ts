import type { Request, Response, NextFunction } from 'express';
import { safeParse } from 'valibot';
import { productSchema } from '../schemas/productSchema';

export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const result = safeParse(productSchema, req.body);

    if (!result.success) {
      res.status(400).json({
        status: 'Failed',
        data: result.issues.map(issue => issue.message)
      });
      return;
    }

    // If the validation is successful, we assign the validated data to the request
    req.body = result.output;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      data: 'Error in data validation'
    });
    return;
  }
}; 