import { Request, Response, NextFunction } from 'express';
import reservationService from '../services/reservation.service.js';

/**
 * Maneja la creación de una nueva reserva para el usuario autenticado.
 *
 * @param req - Petición HTTP con los datos de la reserva en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta 201 con la reserva creada.
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    res.status(201).json(await reservationService.createReservation(userId, req.body));
  } catch (error) { next(error); }
}

/**
 * Maneja el listado de todas las reservas (solo ADMIN).
 *
 * @param req - Petición HTTP.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con el listado de reservas.
 */
export async function listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await reservationService.listAllReservations());
  } catch (error) { next(error); }
}

/**
 * Maneja el listado de las reservas del usuario autenticado.
 *
 * @param req - Petición HTTP del usuario autenticado.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con las reservas del usuario.
 */
export async function listMine(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await reservationService.listMyReservations(req.user!.id));
  } catch (error) { next(error); }
}

/**
 * Maneja la obtención de una reserva por su id.
 *
 * @param req - Petición HTTP con el id de la reserva en params.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con la reserva encontrada.
 */
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, role } = req.user!;
    res.json(await reservationService.getReservationById(Number(req.params.id), id, role));
  } catch (error) { next(error); }
}

/**
 * Maneja la actualización de una reserva (fecha o espacio).
 *
 * @param req - Petición HTTP con el id en params y los datos a actualizar en el body.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta JSON con la reserva actualizada.
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, role } = req.user!;
    res.json(await reservationService.updateReservation(Number(req.params.id), id, role, req.body));
  } catch (error) { next(error); }
}

/**
 * Maneja la eliminación de una reserva.
 *
 * @param req - Petición HTTP con el id de la reserva en params.
 * @param res - Respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware.
 * @returns Envía la respuesta 204 sin contenido.
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, role } = req.user!;
    await reservationService.deleteReservation(Number(req.params.id), id, role);
    res.status(204).send();
  } catch (error) { next(error); }
}
