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

/**
 * Crea una nueva reserva en la base de datos.
 *
 * @param data - Datos de la reserva (userId, workspaceId, reservationDate).
 * @returns La reserva creada.
 */
const create = (data: ReservationData) => Reservation.create(data);

/**
 * Lista todas las reservas con sus relaciones de usuario y espacio.
 *
 * @returns Arreglo con todas las reservas.
 */
const findAll = () => Reservation.findAll({ include: includeRelations });

/**
 * Lista las reservas de un usuario específico con sus relaciones.
 *
 * @param userId - Id del usuario cuyas reservas se desean obtener.
 * @returns Arreglo con las reservas del usuario.
 */
const findByUserId = (userId: number) => Reservation.findAll({ where: { userId }, include: includeRelations });

/**
 * Obtiene una reserva por su id con sus relaciones.
 *
 * @param id - Id de la reserva a buscar.
 * @returns La reserva encontrada o null si no existe.
 */
const findById = (id: number) => Reservation.findByPk(id, { include: includeRelations });

/**
 * Busca un conflicto de reserva para un espacio y fecha dados.
 *
 * @param workspaceId - Id del espacio de trabajo.
 * @param reservationDate - Fecha de la reserva (YYYY-MM-DD).
 * @param excludeId - Id de reserva a excluir de la búsqueda (útil al actualizar).
 * @returns La reserva en conflicto o null si no hay conflicto.
 */
const findConflict = (workspaceId: number, reservationDate: string, excludeId?: number) =>
  Reservation.findOne({
    where: {
      workspaceId,
      reservationDate,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {})
    }
  });

/**
 * Actualiza los datos de una reserva existente.
 *
 * @param id - Id de la reserva a actualizar.
 * @param data - Campos a actualizar.
 * @returns Número de filas afectadas.
 */
const update = (id: number, data: Partial<ReservationData>) => Reservation.update(data, { where: { id } });

/**
 * Elimina una reserva por su id.
 *
 * @param id - Id de la reserva a eliminar.
 * @returns Número de registros eliminados (1 si existía).
 */
const destroy = (id: number) => Reservation.destroy({ where: { id } });

export default { create, findAll, findByUserId, findById, findConflict, update, destroy };
