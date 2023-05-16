// This file is used to connect to the database

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'farm_track',
    'test',
    'test', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
    }
);
module.exports = sequelize