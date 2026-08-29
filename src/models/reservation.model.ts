import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

interface ReservationAttributes {
  id: number;
  userId: number;
  workspaceId: number;
  reservationDate: string;
  createdAt?: Date;
  UpdatedAt?: Date;
}

interface ReservationCreationAttributes extends Optional<
  ReservationAttributes,
  'id' | 'createdAt' | 'UpdatedAt'
> {}

class Reservation
  extends Model<ReservationAttributes, ReservationCreationAttributes>
  implements ReservationAttributes
{
  declare public id: number;
  declare public userId: number;
  declare public workspaceId: number;
  declare public reservationDate: string;
  declare public readonly createdAt: Date;
  declare public readonly UpdatedAt: Date;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workspaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'reservations',
    timestamps: true,
  },
);

export default Reservation;
