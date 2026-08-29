import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesion y devuelve un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "admin@correo.com" }
 *               password: { type: string, example: "admin123" }
 *     responses:
 *       200: { description: Login exitoso, devuelve token }
 *       401: { description: Credenciales incorrectas }
 */
router.post('/login', loginValidator, validate, authController.login);

export default router;