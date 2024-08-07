const { DataTypes } = require('sequelize');
const database = require('../database/config');

// Import function for generate ids
const generateUUIDS = require('../utils/generateUUIDS');

const User = database.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: generateUUIDS,
    allowNull: false,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
});

module.exports = User;
