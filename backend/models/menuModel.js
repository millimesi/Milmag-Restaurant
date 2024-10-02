// File to handle menu ORM in database

import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../utils/dbConfig.js';

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
    timestamps: true, // This enables automatic createdAt and updatedAt
});

export default Menu;
