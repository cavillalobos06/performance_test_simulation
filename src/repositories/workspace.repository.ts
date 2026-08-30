import Workspace from '../models/workspace.model.js';

interface WorkspaceData {
  name: string;
  location: string;
  capacity: number;
  isAvailable?: boolean;
}

/**
 * Crea un nuevo espacio de trabajo en la base de datos.
 *
 * @param data - Datos del espacio (name, location, capacity, isAvailable opcional).
 * @returns El espacio de trabajo creado.
 */
const create = (data: WorkspaceData): Promise<Workspace> => Workspace.create(data);

/**
 * Lista todos los espacios de trabajo.
 *
 * @returns Arreglo con todos los espacios de trabajo.
 */
const findAll = (): Promise<Workspace[]> => Workspace.findAll();

/**
 * Obtiene un espacio de trabajo por su id.
 *
 * @param id - Id del espacio a buscar.
 * @returns El espacio encontrado o null si no existe.
 */
const findById = (id: number): Promise<Workspace | null> => Workspace.findByPk(id);

/**
 * Actualiza los datos de un espacio de trabajo existente.
 *
 * @param id - Id del espacio a actualizar.
 * @param data - Campos a actualizar.
 * @returns Número de filas afectadas.
 */
const update = (id: number, data: Partial<WorkspaceData>): Promise<[affectedCount: number]> =>
  Workspace.update(data, { where: { id } });

/**
 * Elimina un espacio de trabajo por su id.
 *
 * @param id - Id del espacio a eliminar.
 * @returns Número de registros eliminados (1 si existía).
 */
const destroy = (id: number): Promise<number> => Workspace.destroy({ where: { id } });

export default { create, findAll, findById, update, destroy };
