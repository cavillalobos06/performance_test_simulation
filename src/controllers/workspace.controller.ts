import { Request, Response, NextFunction } from 'express';
import workspaceService from '../services/workspace.service.js';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(201).json(await workspaceService.createWorkspace(req.body));
  } catch (error) { next(error); }
}

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await workspaceService.listWorkspaces());
  } catch (error) { next(error); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await workspaceService.getWorkspaceById(Number(req.params.id)));
  } catch (error) { next(error); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await workspaceService.updateWorkspace(Number(req.params.id), req.body));
  } catch (error) { next(error); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await workspaceService.deleteWorkspace(Number(req.params.id));
    res.status(204).send();
  } catch (error) { next(error); }
}