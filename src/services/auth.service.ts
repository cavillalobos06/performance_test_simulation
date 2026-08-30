import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';
import  userRepository from '../repositories/user.repository.js'

/**
 * Inicia sesión de un usuario validando sus credenciales y generando un JWT.
 *
 * @param email - Correo electrónico del usuario.
 * @param password - Contraseña en texto plano del usuario.
 * @returns Token JWT junto con los datos públicos del usuario autenticado.
 * @throws {ApiError} Lanza un error 401 si el email no existe o la contraseña es incorrecta.
 */
async function login(email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new ApiError(401, 'Credenciales incorrectas');

  const passwordValida = await bcrypt.compare(password, user.password);
  if (!passwordValida) throw new ApiError(401, 'Credenciales incorrectas');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' } as jwt.SignOptions
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export default { login };