import { body } from 'express-validator';

export const createWorkspaceValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('capacity')
    .isInt({ gt: 0 })
    .withMessage('Capacity must be a number greater than 0'),
];

export const updateWorkspaceValidator = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('location').optional().notEmpty().withMessage('Location is required'),
  body('capacity')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Capacity must be a number greater than 0'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean'),
];
