import ApiError from '../utils/apiError.js';
import workspaceRepository from '../repositories/workspace.repository.js';

interface CreateWorkspaceInput {
  name: string;
  location: string;
  capacity: number;
}

interface UpdateWorkspaceInput {
  name?: string;
  location?: string;
  capacity?: number;
  isAvailable?: boolean;
}

/**
 * Crea un nuevo espacio de trabajo.
 *
 * @param data - Datos del espacio a crear (name, location, capacity).
 * @returns El espacio de trabajo creado.
 */
const createWorkspace = (data: CreateWorkspaceInput) => workspaceRepository.create(data);

/**
 * Lista todos los espacios de trabajo.
 *
 * @returns Arreglo con todos los espacios de trabajo.
 */
const listWorkspaces = () => workspaceRepository.findAll();

/**
 * Obtiene un espacio de trabajo por su id.
 *
 * @param id - Id del espacio de trabajo a buscar.
 * @returns El espacio de trabajo encontrado.
 * @throws {ApiError} Lanza un error 404 si el espacio no existe.
 */
async function getWorkspaceById(id: number) {
  const workspace = await workspaceRepository.findById(id);
  if (!workspace) throw new ApiError(404, 'Espacio de trabajo no encontrado');
  return workspace;
}

/**
 * Actualiza los datos de un espacio de trabajo existente.
 *
 * @param id - Id del espacio de trabajo a actualizar.
 * @param data - Campos a actualizar (name, location, capacity, isAvailable opcionales).
 * @returns El espacio de trabajo actualizado.
 * @throws {ApiError} Lanza un error 404 si el espacio no existe.
 */
async function updateWorkspace(id: number, data: UpdateWorkspaceInput) {
  await getWorkspaceById(id);
  await workspaceRepository.update(id, data);
  return getWorkspaceById(id);
}

/**
 * Elimina un espacio de trabajo por su id.
 *
 * @param id - Id del espacio de trabajo a eliminar.
 * @returns Número de registros eliminados (1 si existía).
 * @throws {ApiError} Lanza un error 404 si el espacio no existe.
 */
async function deleteWorkspace(id: number) {
  await getWorkspaceById(id);
  return workspaceRepository.destroy(id);
}

export default { createWorkspace, listWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace };