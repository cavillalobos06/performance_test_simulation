import User from '../models/user.model.js';

export class UserRepository {
  create(data: {
    name: string;
    email: string;
    password: string;
    role: User['role'];
  }) {
    return User.create(data);
  }
  findAll() {
    return User.findAll({
      attributes: { exclude: ['password'] },
    });
  }
  findById(id: number) {
    return User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  findByIdWithPassword(id: number) {
    return User.findByPk(id);
  }

  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async update(
    user: User,
    data: Partial<Pick<User, 'name' | 'email' | 'password' | 'role'>>,
  ) {
    return user.update(data);
  }

  async delete(user: User) {
    await user.destroy();
  }
}
