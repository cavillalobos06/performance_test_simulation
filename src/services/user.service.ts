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

/**
 * Crea un nuevo usuario hasheando su contraseña previamente.
 *
 * @param data - Datos del usuario a crear (name, email, password, role opcional).
 * @returns Datos públicos del usuario creado (sin contraseña).
 * @throws {ApiError} Lanza un error 409 si el email ya está registrado.
 */
async function createUser(data: CreateUserInput) {
  const existente = await userRepository.findByEmail(data.email);
  if (existente) throw new ApiError(409, 'El email ya esta registrado');

  const passwordHasheada = await bcrypt.hash(data.password, 10);
  const usuario = await userRepository.create({ ...data, password: passwordHasheada });

  return { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role };
}

const listUsers = () => userRepository.findAll();

/**
 * Obtiene un usuario por su id, excluyendo la contraseña.
 *
 * @param id - Id del usuario a buscar.
 * @returns El usuario encontrado sin el campo password.
 * @throws {ApiError} Lanza un error 404 si el usuario no existe.
 */
async function getUserById(id: number) {
  const usuario = await userRepository.findById(id);
  if (!usuario) throw new ApiError(404, 'Usuario no encontrado');
  return usuario;
}

/**
 * Actualiza los datos de un usuario existente.
 *
 * @param id - Id del usuario a actualizar.
 * @param data - Campos a actualizar (name, email, role opcionales).
 * @returns El usuario actualizado, sin la contraseña.
 * @throws {ApiError} Lanza un error 404 si el usuario no existe o 409 si el nuevo email ya lo usa otro usuario.
 */
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

/**
 * Elimina un usuario por su id.
 *
 * @param id - Id del usuario a eliminar.
 * @returns Número de registros eliminados (1 si existía).
 * @throws {ApiError} Lanza un error 404 si el usuario no existe.
 */
async function deleteUser(id: number) {
  await getUserById(id);
  return userRepository.destroy(id);
}

export default { createUser, listUsers, getUserById, updateUser, deleteUser };