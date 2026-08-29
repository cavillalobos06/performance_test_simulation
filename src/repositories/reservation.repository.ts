import { Op } from 'sequelize';
import Reservation from '../models/reservation.model.js';
import User from '../models/user.model.js';
import Workspace from '../models/workspace.model.js';

interface ReservationData {
  userId: number;
  workspaceId: number;
  reservationDate: string;
}

const includeRelations = [
  {
    model: User,
    as: 'user',
    attributes: ['id', 'name', 'email'],
  },
  {
    model: Workspace,
    as: 'workspace',
    attributes: ['id', 'name', 'location'],
  },
];

const create = (data: ReservationData) => Reservation.create(data);

const findAll = () => Reservation.findAll({ include: includeRelations });
const findByUserId = (userId: number) => Reservation.findAll({ where: { userId }, include: includeRelations });
const findById = (id: number) => Reservation.findByPk(id, { include: includeRelations });

const findConflict = (workspaceId: number, reservationDate: string, excludeId?: number) =>
  Reservation.findOne({
    where: {
      workspaceId,
      reservationDate,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {})
    }
  });

const update = (id: number, data: Partial<ReservationData>) => Reservation.update(data, { where: { id } });
const destroy = (id: number) => Reservation.destroy({ where: { id } });

export default { create, findAll, findByUserId, findById, findConflict, update, destroy };
