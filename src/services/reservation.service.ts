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

/**
 * Valida las reglas de negocio de una reserva: existencia y disponibilidad del espacio,
 * y que no exista un conflicto de fechas previo.
 *
 * @param workspaceId - Id del espacio de trabajo a reservar.
 * @param reservationDate - Fecha de la reserva (YYYY-MM-DD).
 * @param excludeId - Id de reserva a excluir del chequeo de conflicto (útil al actualizar).
 * @throws {ApiError} Lanza un error 404 si el espacio no existe, 400 si no está disponible
 *   o 409 si ya existe una reserva para ese espacio y fecha.
 */
async function validarReglasDeNegocio(workspaceId: number, reservationDate: string, excludeId?: number) {
  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) throw new ApiError(404, 'El espacio de trabajo no existe');
  if (!workspace.isAvailable) throw new ApiError(400, 'El espacio de trabajo no esta disponible');

  const conflicto = await reservationRepository.findConflict(workspaceId, reservationDate, excludeId);
  if (conflicto) throw new ApiError(409, 'Ya existe una reserva para ese espacio en esa fecha');
}

/**
 * Crea una nueva reserva para el usuario autenticado.
 *
 * @param userId - Id del usuario que realiza la reserva.
 * @param data - Datos de la reserva (workspaceId, reservationDate).
 * @returns La reserva creada.
 * @throws {ApiError} Propaga errores de validación de reglas de negocio.
 */
async function createReservation(userId: number, data: CreateReservationInput) {
  await validarReglasDeNegocio(data.workspaceId, data.reservationDate);
  return reservationRepository.create({ userId, ...data });
}

/**
 * Lista todas las reservas existentes, incluyendo usuario y espacio relacionados.
 *
 * @returns Arreglo con todas las reservas.
 */
const listAllReservations = () => reservationRepository.findAll();

/**
 * Lista las reservas de un usuario específico.
 *
 * @param userId - Id del usuario cuyas reservas se desean obtener.
 * @returns Arreglo con las reservas del usuario.
 */
const listMyReservations = (userId: number) => reservationRepository.findByUserId(userId);

/**
 * Obtiene una reserva por su id, validando permisos de acceso.
 *
 * @param id - Id de la reserva a buscar.
 * @param userId - Id del usuario autenticado.
 * @param role - Rol del usuario autenticado (ADMIN o USER).
 * @returns La reserva encontrada.
 * @throws {ApiError} Lanza un error 404 si no existe o 403 si el usuario no tiene permisos.
 */
async function getReservationById(id: number, userId: number, role: UserRole) {
  const reserva = await reservationRepository.findById(id);
  if (!reserva) throw new ApiError(404, 'Reserva no encontrada');
  if (role !== 'ADMIN' && reserva.userId !== userId) {
    throw new ApiError(403, 'No tienes permisos para ver esta reserva');
  }
  return reserva;
}

/**
 * Actualiza el espacio o la fecha de una reserva existente.
 *
 * @param id - Id de la reserva a actualizar.
 * @param userId - Id del usuario autenticado.
 * @param role - Rol del usuario autenticado.
 * @param data - Campos a actualizar (workspaceId, reservationDate opcionales).
 * @returns La reserva actualizada.
 * @throws {ApiError} Propaga errores de permisos o de reglas de negocio.
 */
async function updateReservation(id: number, userId: number, role: UserRole, data: UpdateReservationInput) {
  const reservaActual = await getReservationById(id, userId, role);

  const nuevoWorkspaceId = data.workspaceId ?? reservaActual.workspaceId;
  const nuevaFecha = data.reservationDate ?? reservaActual.reservationDate;

  await validarReglasDeNegocio(nuevoWorkspaceId, nuevaFecha, id);
  await reservationRepository.update(id, { workspaceId: nuevoWorkspaceId, reservationDate: nuevaFecha });

  return reservationRepository.findById(id);
}

/**
 * Elimina una reserva por su id, validando permisos de acceso.
 *
 * @param id - Id de la reserva a eliminar.
 * @param userId - Id del usuario autenticado.
 * @param role - Rol del usuario autenticado.
 * @returns Número de registros eliminados (1 si existía).
 * @throws {ApiError} Propaga errores de permisos o de reserva no encontrada.
 */
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