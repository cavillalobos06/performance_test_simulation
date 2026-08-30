import User, { UserRole } from '../models/user.model.js';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @param data - Datos del usuario (name, email, password, role opcional).
 * @returns El usuario creado.
 */
const create = (data: CreateUserData) => User.create(data);

/**
 * Lista todos los usuarios, excluyendo la contraseña.
 *
 * @returns Arreglo con todos los usuarios.
 */
const findAll = () => User.findAll({ attributes: { exclude: ['password'] } });

/**
 * Obtiene un usuario por su id, excluyendo la contraseña.
 *
 * @param id - Id del usuario a buscar.
 * @returns El usuario encontrado o null si no existe.
 */
const findById = (id: number) =>
  User.findByPk(id, { attributes: { exclude: ['password'] } });

/**
 * Obtiene un usuario por su email (incluye la contraseña para validaciones de login).
 *
 * @param email - Correo electrónico del usuario.
 * @returns El usuario encontrado o null si no existe.
 */
const findByEmail = (email: string) => User.findOne({ where: { email } });

/**
 * Actualiza los datos de un usuario existente.
 *
 * @param id - Id del usuario a actualizar.
 * @param data - Campos a actualizar.
 * @returns Número de filas afectadas.
 */
const update = (id: number, data: Partial<CreateUserData>) =>
  User.update(data, { where: { id } });

/**
 * Elimina un usuario por su id.
 *
 * @param id - Id del usuario a eliminar.
 * @returns Número de registros eliminados (1 si existía).
 */
const destroy = (id: number) => User.destroy({ where: { id } });

export default { create, findAll, findById, findByEmail, update, destroy };
