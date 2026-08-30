import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service.js';

/**
 * Maneja la creación de un nuevo usuario.
 *
 * @param req - Petición HTTP con los datos del usuario en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta 201 con el usuario creado.
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await userService.createUser(req.body);
    res.status(201).json(usuario);
  } catch (error) { next(error); }
}

/**
 * Maneja el listado de todos los usuarios (solo ADMIN).
 *
 * @param req - Petición HTTP.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el listado de usuarios.
 */
export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await userService.listUsers());
  } catch (error) { next(error); }
}

/**
 * Maneja la obtención de un usuario por su id.
 *
 * @param req - Petición HTTP con el id del usuario en params.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el usuario encontrado.
 */
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await userService.getUserById(Number(req.params.id)));
  } catch (error) { next(error); }
}

/**
 * Maneja la actualización de un usuario.
 *
 * @param req - Petición HTTP con el id en params y los datos a actualizar en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el usuario actualizado.
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await userService.updateUser(Number(req.params.id), req.body));
  } catch (error) { next(error); }
}

/**
 * Maneja la eliminación de un usuario (solo ADMIN).
 *
 * @param req - Petición HTTP con el id del usuario en params.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta 204 sin contenido.
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) { next(error); }
}
