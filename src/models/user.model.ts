import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export type UserRole = 'ADMIN' | 'USER';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<
  UserAttributes,
  'id' | 'role' | 'createdAt' | 'updatedAt'
> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare public id: number;
  declare public name: string;
  declare public email: string;
  declare public password: string;
  declare public role: UserRole;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
      defaultValue: 'USER' as UserRole,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
);

export default User;