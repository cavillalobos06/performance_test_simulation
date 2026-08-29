import { body } from 'express-validator';

export const createReservationValidator = [
  body('workspaceId')
    .isInt()
    .withMessage('Workspace ID is required and must be an integer'),
  body('reservationDate')
    .isISO8601()
    .withMessage('Reservation date must be a valid date (YYYY-MM-DD)'),
];

export const updateReservationValidator = [
  body('workspaceId')
    .optional()
    .isInt()
    .withMessage('Workspace ID is required and must be an integer'),
  body('reservationDate')
    .optional()
    .isISO8601()
    .withMessage('Reservation date must be a valid date (YYYY-MM-DD)'),
];
