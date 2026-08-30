import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service.js';

/**
 * Maneja la petición de inicio de sesión y devuelve el token JWT del usuario.
 *
 * @param req - Petición HTTP con email y password en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el token y datos del usuario.
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login(email, password);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}