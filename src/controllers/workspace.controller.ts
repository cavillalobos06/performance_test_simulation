import { Request, Response, NextFunction } from 'express';
import workspaceService from '../services/workspace.service.js';

/**
 * Maneja la creación de un nuevo espacio de trabajo (solo ADMIN).
 *
 * @param req - Petición HTTP con los datos del espacio en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta 201 con el espacio creado.
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(201).json(await workspaceService.createWorkspace(req.body));
  } catch (error) { next(error); }
}

/**
 * Maneja el listado de todos los espacios de trabajo.
 *
 * @param req - Petición HTTP.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el listado de espacios.
 */
export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await workspaceService.listWorkspaces());
  } catch (error) { next(error); }
}

/**
 * Maneja la obtención de un espacio de trabajo por su id.
 *
 * @param req - Petición HTTP con el id del espacio en params.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el espacio encontrado.
 */
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await workspaceService.getWorkspaceById(Number(req.params.id)));
  } catch (error) { next(error); }
}

/**
 * Maneja la actualización de un espacio de trabajo (solo ADMIN).
 *
 * @param req - Petición HTTP con el id en params y los datos a actualizar en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el espacio actualizado.
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await workspaceService.updateWorkspace(Number(req.params.id), req.body));
  } catch (error) { next(error); }
}

/**
 * Maneja la eliminación de un espacio de trabajo (solo ADMIN).
 *
 * @param req - Petición HTTP con el id del espacio en params.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta 204 sin contenido.
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await workspaceService.deleteWorkspace(Number(req.params.id));
    res.status(204).send();
  } catch (error) { next(error); }
}
