// Charge models
const Usage = require('../models/usageModel')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')
const Sequelize = require('sequelize');

// Add a vehicle (all good)
exports.createVehicle = async function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    };
    // create a vehicle (non-persistent)
    let vehicle = Vehicle.build({
        model_make: req.body.model_make, 
        nickname: req.body.nickname, 
        type: req.body.type})
    // save vehicle to database
    vehicle.save()
    .then(newVehicle => {
        res.json(newVehicle);
    })
    .catch(error => res.status(500).json({ 
        message: err.message || "Internal server error" 
    }))
}

// Fetch all vehicles (all good)
exports.getVehicles = async function (req, res) {
    Vehicle.findAll()
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(500).json({ 
        message: err.message || "Internal server error" 
    }))
};

// Fetch a single vehicle (all good)
exports.getVehicle = async function (req, res) {
    try {
        const vehicleId = Number(req.params.vehicle_id);
        if (isNaN(vehicleId)) {
          return res.status(400).json({ message: 'Invalid vehicle ID' });
        }
        const vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong...' });
      }
    };

// Update a vehicle (almost good, does not return updated vehicle)
exports.updateVehicle = async function (req, res) {
    const vehicleId = Number(req.params.vehicle_id);
    if (isNaN(vehicleId)) {
        return res.status(400).json({ message: 'Invalid vehicle ID' });
    }
    try {
        const vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        if (!req.body) {
            return res.status(400).json({
                message: "Content can not be empty!"
            });
        }
        const [numRows, updatedVehicles] = await Vehicle.update({
            model_make: req.body.model_make, 
            nickname: req.body.nickname, 
            type: req.body.type},
            { where: { vehicle_id: req.params.vehicle_id }, returning: true });
        const updatedVehicle = updatedVehicles[0];
        // console.log(updatedVehicle)
        // console.log(numRows)
        res.json(updatedVehicle);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Delete a vehicle (all good)
exports.deleteVehicle = async function (req, res) {
    try {
        const vehicleId = Number(req.params.vehicle_id);
        if (isNaN(vehicleId)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        }
        const vehicle = await Vehicle.findByPk(vehicleId);
        if (vehicle) {
            await vehicle.destroy();
            res.json({ message: 'Vehicle deleted successfully' });
        } else {
            res.status(404).json({ error: 'Vehicle not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Search for a vehicle (to test)
exports.searchVehicle = async function (req, res) {
    const query = req.query.q || '';
    const vehicles = await Vehicle.findAll({ where: { model_make: { [Sequelize.Op.like]: `%${query}%` }}
    });
    res.json(vehicles);
};

// Fetch stats for a vehicle (to test once Usage controller is done)
exports.getVehicleStats = async function (req, res) {
    const vehicleId = Number(req.params.vehicle_id);
    const stats = await Usage.findAll({
        attributes: [
        [Sequelize.fn('SUM', Sequelize.col('duration')), 'total_hours'],
        [Sequelize.fn('SUM', Sequelize.col('fuel_amount')), 'total_fuel_cost'],
        [Sequelize.fn('SUM', Sequelize.col('maintenance_cost')), 'total_maintenance_cost']
        ],
        where: {
        vehicle_id: vehicleId
        }
    });
    res.json(stats[0]);
};

    