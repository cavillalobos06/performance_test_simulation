import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service.js';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await userService.createUser(req.body);
    res.status(201).json(usuario);
  } catch (error) { next(error); }
}

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await userService.listUsers());
  } catch (error) { next(error); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await userService.getUserById(Number(req.params.id)));
  } catch (error) { next(error); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await userService.updateUser(Number(req.params.id), req.body));
  } catch (error) { next(error); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) { next(error); }
}