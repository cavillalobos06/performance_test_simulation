import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { createUserValidator, updateUserValidator } from '../validators/user.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name: { type: string, example: "Ana Torres" }
 *         email: { type: string, example: "ana@correo.com" }
 *         password: { type: string, example: "clave123" }
 *         role: { type: string, enum: [ADMIN, USER], example: "USER" }
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201: { description: Usuario creado }
 *       409: { description: El email ya esta registrado }
 *   get:
 *     summary: Lista todos los usuarios (solo ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de usuarios }
 *       403: { description: No tienes permisos }
 */
router.post('/', createUserValidator, validate, userController.create);
router.get('/', authMiddleware, authorize('ADMIN'), userController.list);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Usuario encontrado }
 *       404: { description: Usuario no encontrado }
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200: { description: Usuario actualizado }
 *       404: { description: Usuario no encontrado }
 *   delete:
 *     summary: Elimina un usuario (solo ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Usuario eliminado }
 *       403: { description: No tienes permisos }
 */
router.get('/:id', authMiddleware, userController.getById);
router.put('/:id', authMiddleware, updateUserValidator, validate, userController.update);
router.delete('/:id', authMiddleware, authorize('ADMIN'), userController.remove);

export default router;