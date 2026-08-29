import { Router } from 'express';
import * as workspaceController from '../controllers/workspace.controller.js';
import { createWorkspaceValidator, updateWorkspaceValidator } from '../validators/workspace.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Workspace:
 *       type: object
 *       properties:
 *         name: { type: string, example: "Sala Norte" }
 *         location: { type: string, example: "Piso 3" }
 *         capacity: { type: integer, example: 6 }
 *         isAvailable: { type: boolean, example: true }
 */

/**
 * @swagger
 * /workspaces:
 *   get:
 *     summary: Lista todos los espacios de trabajo
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de espacios }
 *   post:
 *     summary: Crea un espacio de trabajo (solo ADMIN)
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workspace'
 *     responses:
 *       201: { description: Espacio creado }
 *       403: { description: No tienes permisos }
 */
router.get('/', authMiddleware, workspaceController.list);
router.post('/', authMiddleware, authorize('ADMIN'), createWorkspaceValidator, validate, workspaceController.create);

/**
 * @swagger
 * /workspaces/{id}:
 *   get:
 *     summary: Obtiene un espacio de trabajo por id
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Espacio encontrado }
 *       404: { description: Espacio no encontrado }
 *   put:
 *     summary: Actualiza un espacio de trabajo (solo ADMIN)
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workspace'
 *     responses:
 *       200: { description: Espacio actualizado }
 *   delete:
 *     summary: Elimina un espacio de trabajo (solo ADMIN)
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Espacio eliminado }
 */
router.get('/:id', authMiddleware, workspaceController.getById);
router.put('/:id', authMiddleware, authorize('ADMIN'), updateWorkspaceValidator, validate, workspaceController.update);
router.delete('/:id', authMiddleware, authorize('ADMIN'), workspaceController.remove);

export default router;