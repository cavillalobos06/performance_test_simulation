import ApiError from '../utils/apiError.js';
import reservationRepository from '../repositories/reservation.repository.js';
import workspaceRepository from '../repositories/workspace.repository.js';
import { UserRole } from '../models/user.model.js';

interface CreateReservationInput {
  workspaceId: number;
  reservationDate: string;
}

interface UpdateReservationInput {
  workspaceId?: number;
  reservationDate?: string;
}

async function validarReglasDeNegocio(workspaceId: number, reservationDate: string, excludeId?: number) {
  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) throw new ApiError(404, 'El espacio de trabajo no existe');
  if (!workspace.isAvailable) throw new ApiError(400, 'El espacio de trabajo no esta disponible');

  const conflicto = await reservationRepository.findConflict(workspaceId, reservationDate, excludeId);
  if (conflicto) throw new ApiError(409, 'Ya existe una reserva para ese espacio en esa fecha');
}

async function createReservation(userId: number, data: CreateReservationInput) {
  await validarReglasDeNegocio(data.workspaceId, data.reservationDate);
  return reservationRepository.create({ userId, ...data });
}

const listAllReservations = () => reservationRepository.findAll();
const listMyReservations = (userId: number) => reservationRepository.findByUserId(userId);

async function getReservationById(id: number, userId: number, role: UserRole) {
  const reserva = await reservationRepository.findById(id);
  if (!reserva) throw new ApiError(404, 'Reserva no encontrada');
  if (role !== 'ADMIN' && reserva.userId !== userId) {
    throw new ApiError(403, 'No tienes permisos para ver esta reserva');
  }
  return reserva;
}

async function updateReservation(id: number, userId: number, role: UserRole, data: UpdateReservationInput) {
  const reservaActual = await getReservationById(id, userId, role);

  const nuevoWorkspaceId = data.workspaceId ?? reservaActual.workspaceId;
  const nuevaFecha = data.reservationDate ?? reservaActual.reservationDate;

  await validarReglasDeNegocio(nuevoWorkspaceId, nuevaFecha, id);
  await reservationRepository.update(id, { workspaceId: nuevoWorkspaceId, reservationDate: nuevaFecha });

  return reservationRepository.findById(id);
}

async function deleteReservation(id: number, userId: number, role: UserRole) {
  await getReservationById(id, userId, role);
  return reservationRepository.destroy(id);
}

export default {
  createReservation,
  listAllReservations,
  listMyReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};