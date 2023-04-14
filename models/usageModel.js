// Description: This file contains the model for the vehicle table in the database.

const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const Usage = sequelize.define('usage', {
    usage_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    vehicle_id: { type: Sequelize.INTEGER, allowNull: false },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    duration: { type: Sequelize.INTEGER, allowNull: false },
    date: { type: Sequelize.DATEONLY, allowNull: false },
    fuel_amount: { type: Sequelize.DOUBLE },
    maintenance_cost: { type: Sequelize.DOUBLE },
    note: { type: Sequelize.STRING }
});

module.exports = Usage;