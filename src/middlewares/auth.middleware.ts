import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import { UserRole } from '../models/user.model.js'

interface JwtPayload {
    id: number;
    role: UserRole;
}

export function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(new ApiError(401, 'Authorization header missing'));
    }

    const [ type, token ] = authorization.split(' ');

    if(type !== 'Bearer' || !token) {
        return next(new ApiError(401, 'Invalid authorization header format'));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = {
            id: payload.id,
            role: payload.role
        }

        next();
    }catch (error){
        next(new ApiError(401, 'Ivalid or expired token'));
    }
}