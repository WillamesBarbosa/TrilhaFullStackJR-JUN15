const { Sequelize } = require('sequelize');
const path = require('path');

// Connection pool settings
/* eslint-disable */
  const database = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, './database.db'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

module.exports = database;
