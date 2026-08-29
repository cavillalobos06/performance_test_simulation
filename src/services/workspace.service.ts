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

const createWorkspace = (data: CreateWorkspaceInput) => workspaceRepository.create(data);
const listWorkspaces = () => workspaceRepository.findAll();

async function getWorkspaceById(id: number) {
  const workspace = await workspaceRepository.findById(id);
  if (!workspace) throw new ApiError(404, 'Espacio de trabajo no encontrado');
  return workspace;
}

async function updateWorkspace(id: number, data: UpdateWorkspaceInput) {
  await getWorkspaceById(id);
  await workspaceRepository.update(id, data);
  return getWorkspaceById(id);
}

async function deleteWorkspace(id: number) {
  await getWorkspaceById(id);
  return workspaceRepository.destroy(id);
}

export default { createWorkspace, listWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace };