// Description: This file contains the model for the vehicle table in the database.

const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: { type: Sequelize.STRING, allowNull: false },
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING, allowNull: false },
    is_admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
});

module.exports = User;