import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError.js';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
