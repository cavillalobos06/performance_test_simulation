import { Request, Response, NextFunction } from 'express';
import reservationService from '../services/reservation.service.js';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    res.status(201).json(await reservationService.createReservation(userId, req.body));
  } catch (error) { next(error); }
}

export async function listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await reservationService.listAllReservations());
  } catch (error) { next(error); }
}

export async function listMine(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await reservationService.listMyReservations(req.user!.id));
  } catch (error) { next(error); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, role } = req.user!;
    res.json(await reservationService.getReservationById(Number(req.params.id), id, role));
  } catch (error) { next(error); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, role } = req.user!;
    res.json(await reservationService.updateReservation(Number(req.params.id), id, role, req.body));
  } catch (error) { next(error); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, role } = req.user!;
    await reservationService.deleteReservation(Number(req.params.id), id, role);
    res.status(204).send();
  } catch (error) { next(error); }
}