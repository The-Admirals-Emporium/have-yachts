const Sequelize = require('sequelize');
const db = require('../db');

const Boat = db.define('boat', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  cost: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0,
    },
  },
});

module.exports = Boat;
