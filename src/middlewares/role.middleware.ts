import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, 'You do not have permission to access this resource'),
      );
    }
    next();
  };
}
