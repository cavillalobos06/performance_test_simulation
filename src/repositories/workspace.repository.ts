import Workspace from '../models/workspace.model.js';

interface WorkspaceData {
  name: string;
  location: string;
  capacity: number;
  isAvailable?: boolean;
}

const create = (data: WorkspaceData) => Workspace.create(data);

const findAll = () => Workspace.findAll();

const findById = (id: number) => Workspace.findByPk(id);

const update = (id: number, data: Partial<WorkspaceData>) =>
  Workspace.update(data, { where: { id } });

const destroy = (id: number) => Workspace.destroy({ where: { id } });

export default { create, findAll, findById, update, destroy };
