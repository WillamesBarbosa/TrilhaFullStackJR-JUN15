const { DataTypes } = require('sequelize');
const database = require('../database/config');

// Import function for generate ids
const generateUUIDS = require('../utils/generateUUIDS');
const User = require('./userModel');

const Project = database.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: generateUUIDS,
    allowNull: false,
    primaryKey: true,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    reference: {
      model: User,
      key: 'id',
    },
  },
});

// Defines one-to-many relationship between the User model and the Project model
User.hasMany(Project, { foreignKey: 'userId' });
// Defines many-to-one relationship between the Project model and the User model
Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;
