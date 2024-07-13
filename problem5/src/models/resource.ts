// src/models/employee.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
export interface ResourceAttributes {
  id?: number;
  name: string;
  description: string;
  price: number;
}

export class Resource extends Model<ResourceAttributes> implements ResourceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static tableName = 'resource';
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'resource',
  }
);

export default Resource;
