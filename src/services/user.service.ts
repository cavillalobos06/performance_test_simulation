import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError.js';
import userRepository from '../repositories/user.repository.js';
import { UserRole } from '../models/user.model.js';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
}

async function createUser(data: CreateUserInput) {
  const existente = await userRepository.findByEmail(data.email);
  if (existente) throw new ApiError(409, 'El email ya esta registrado');

  const passwordHasheada = await bcrypt.hash(data.password, 10);
  const usuario = await userRepository.create({ ...data, password: passwordHasheada });

  return { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role };
}

const listUsers = () => userRepository.findAll();

async function getUserById(id: number) {
  const usuario = await userRepository.findById(id);
  if (!usuario) throw new ApiError(404, 'Usuario no encontrado');
  return usuario;
}

async function updateUser(id: number, data: UpdateUserInput) {
  await getUserById(id);

  if (data.email) {
    const existente = await userRepository.findByEmail(data.email);
    if (existente && existente.id !== id) {
      throw new ApiError(409, 'El email ya esta registrado por otro usuario');
    }
  }

  await userRepository.update(id, data);
  return getUserById(id);
}

async function deleteUser(id: number) {
  await getUserById(id);
  return userRepository.destroy(id);
}

export default { createUser, listUsers, getUserById, updateUser, deleteUser };