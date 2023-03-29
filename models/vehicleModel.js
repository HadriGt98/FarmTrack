// Description: This file contains the model for the vehicle table in the database.

const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const Vehicle = sequelize.define('vehicle', {
    vehicle_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    model_make: { type: Sequelize.STRING, allowNull: false },
    nickname: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Vehicle;