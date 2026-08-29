import { sequelize } from '../config/database.js';
import User from './user.model.js';
import Workspace from './workspace.model.js';
import Reservation from './reservation.model.js';

User.hasMany(Reservation, {
  foreignKey: 'userId' as 'reservations',
});

Reservation.belongsTo(User, {
  foreignKey: 'userId' as 'user',
});

Workspace.hasMany(Reservation, {
  foreignKey: 'workspaceId' as 'reservations',
});

Reservation.belongsTo(Workspace, {
  foreignKey: 'workspaceId' as 'workspace',
});

export { sequelize, User, Workspace, Reservation };