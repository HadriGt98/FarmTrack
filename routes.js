// Description: This file contains all the routes for the application

let express = require('express'); // import express framework
let router = express.Router(); // initialize express router

// import controllers
let userController = require('./controllers/userController');
let vehicleController = require('./controllers/vehicleController');
let usageController = require('./controllers/usageController');
let auth = require('./auth.js');

// user routes
router.post('/signup', userController.createUser);
router.post('/login', auth.loginUser);

// vehicle routes
router.get('/vehicles', auth.isAuth, vehicleController.getVehicles); // list all vehicles
router.post('/vehicle', auth.isAuth, auth.isAdmin, vehicleController.createVehicle); // create vehicle - admin
router.get('/vehicle/:vehicle_id', auth.isAuth, vehicleController.getVehicle); // show vehicle
router.put('/vehicle/:vehicle_id', auth.isAuth, auth.isAdmin, vehicleController.updateVehicle); // update vehicle - admin
router.delete('/vehicle/:vehicle_id', auth.isAuth, auth.isAdmin, vehicleController.deleteVehicle); // delete vehicle -admin
router.get('/stats/:vehicle_id', auth.isAuth, vehicleController.getVehicleStats); // show stats
router.get('/search/vehicles', auth.isAuth, vehicleController.searchVehicles); // search vehicle

// usage routes
router.get('/usages/:vehicle_id', auth.isAuth, usageController.getUsages); // show usages for vehicle
router.post('/usage', auth.isAuth, usageController.createUsage); // create usage
router.get('/usage/:usage_id', auth.isAuth, usageController.getUsage); // show usage - ?admin? (needed only for put to have a front end)
router.put('/usage/:usage_id', auth.isAuth, usageController.updateUsage); // update usage - ?admin? (probably not needed)
router.delete('/usage/:usage_id', auth.isAuth, auth.isAdmin, usageController.deleteUsage); // delete usage - admin

module.exports = router;