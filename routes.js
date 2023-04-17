// Description: This file contains all the routes for the application

let express = require('express'); // import express framework
let router = express.Router(); // initialize express router

// import controllers
let userController = require('./controllers/userController');
let vehicleController = require('./controllers/vehicleController');
let usageController = require('./controllers/usageController');

// user routes
router.post('/signup', userController.createUser);

// vehicle routes
router.get('/vehicles', vehicleController.getVehicles);
router.post('/vehicle', vehicleController.createVehicle);
router.get('/vehicle/:vehicle_id', vehicleController.getVehicle);
router.put('/vehicle/:vehicle_id', vehicleController.updateVehicle);
router.delete('/vehicle/:vehicle_id', vehicleController.deleteVehicle);
router.get('/stats/:vehicle_id', vehicleController.getVehicleStats);
router.get('/search/vehicles', vehicleController.searchVehicles);

// usage routes
router.get('/usages/:vehicle_id', usageController.getUsages);
router.post('/usage', usageController.createUsage);
router.get('/usage/:usage_id', usageController.getUsage);
router.put('/usage/:usage_id', usageController.updateUsage);
router.delete('/usage/:usage_id', usageController.deleteUsage);

module.exports = router;