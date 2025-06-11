import type { Request, Response, NextFunction } from 'express';

export const checkOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userIdSearched = req.params.userId as string;
    const activeUserId = req.body.user?.user_id as string;

    console.log('userIdSearched', userIdSearched);
    console.log('activeUserId', activeUserId);

    if (req.body.user?.role_user === 'Admin') {
      next();
      return;
    }

    if (userIdSearched !== activeUserId) {
      res.status(403).json({ status: 'Failed', data: 'You do not have permission to access this resource' });
      return;
    }

    next();
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ status: 'Failed', data: 'Error verifying resource ownership' });
  }
}; 