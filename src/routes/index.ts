import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import workspaceRoutes from './workspace.routes.js';
import reservationRoutes from './reservations.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/reservations', reservationRoutes);

export default router;