import { Router } from 'express';
import * as reservationController from '../controllers/reservation.controller.js';
import { createReservationValidator, updateReservationValidator } from '../validators/reservation.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         workspaceId: { type: integer, example: 1 }
 *         reservationDate: { type: string, example: "2026-09-10" }
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crea una reserva (el usuario sale del token, no del body)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201: { description: Reserva creada }
 *       400: { description: Espacio no disponible }
 *       409: { description: Ya existe una reserva para ese espacio y fecha }
 *   get:
 *     summary: Lista todas las reservas (solo ADMIN)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de reservas }
 */
router.post('/', authMiddleware, createReservationValidator, validate, reservationController.create);
router.get('/', authMiddleware, authorize('ADMIN'), reservationController.listAll);

/**
 * @swagger
 * /reservations/my-reservations:
 *   get:
 *     summary: Lista las reservas del usuario autenticado
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Listado de mis reservas }
 */
router.get('/my-reservations', authMiddleware, reservationController.listMine);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obtiene una reserva por id
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Reserva encontrada }
 *       404: { description: Reserva no encontrada }
 *   put:
 *     summary: Actualiza fecha o espacio de una reserva
 *     tags: [Reservations]
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
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200: { description: Reserva actualizada }
 *   delete:
 *     summary: Elimina una reserva
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Reserva eliminada }
 */
router.get('/:id', authMiddleware, reservationController.getById);
router.put('/:id', authMiddleware, updateReservationValidator, validate, reservationController.update);
router.delete('/:id', authMiddleware, reservationController.remove);

export default router;