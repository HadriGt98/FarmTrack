// This file is used to connect to the database

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    farm_track,
    root, {
    dialect: 'mysql',
    host: 'localhost'
    }
);
module.exports = sequelize