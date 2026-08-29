import User, { UserRole } from '../models/user.model.js';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

const create = (data: CreateUserData) => User.create(data);

const findAll = () => User.findAll({ attributes: { exclude: ['password'] } });

const findById = (id: number) =>
  User.findByPk(id, { attributes: { exclude: ['password'] } });

const findByEmail = (email: string) => User.findOne({ where: { email } });

const update = (id: number, data: Partial<CreateUserData>) =>
  User.update(data, { where: { id } });

const destroy = (id: number) => User.destroy({ where: { id } });

export default { create, findAll, findById, findByEmail, update, destroy };
