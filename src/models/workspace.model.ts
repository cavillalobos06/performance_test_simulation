import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/database.js";

interface WorkspaceAttributes {
    id: number;
    name: string;
    location: string;
    capacity: number;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface WorkspaceCreationAttributes extends Optional<WorkspaceAttributes, 'id' | 'isAvailable' | 'createdAt' | 'updatedAt'>{}

class Workspace extends Model<WorkspaceAttributes, WorkspaceCreationAttributes> implements WorkspaceAttributes {
    declare public id: number;
    declare public name: string;
    declare public location: string;
    declare public capacity: number;
    declare public isAvailable: boolean;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Workspace.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }},
    {
        sequelize,
        tableName: 'workspaces',
        timestamps: true
    }
)

export default Workspace;