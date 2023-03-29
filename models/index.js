// Description: This file is used to create the database connection and to import all the models.

const Sequelize = require('sequelize');
const sequelize = require('../db.js');

// Import all the models
const db = {}; // This is the object that will contain all the models
db.Sequelize = Sequelize; // This is the Sequelize object
db.sequelize = sequelize; // This is the Sequelize connection

// Import all the models
db.User = require('./userModel.js');
db.Vehicle = require('./vehicleModel.js');
db.Usage = require('./usageModel.js');

// Create the associations between the models
db.User.hasMany(db.Usage, { foreignKey: 'user_id' });
db.Usage.belongsTo(db.User, { foreignKey: 'user_id' });
db.Usage.belongsTo(db.Vehicle, { foreignKey: 'vehicle_id' });
db.Vehicle.hasMany(db.Usage, { foreignKey: 'vehicle_id' });

module.exports = db;