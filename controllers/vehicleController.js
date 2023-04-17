// Charge models
const Usage = require('../models/usageModel')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')
const Sequelize = require('sequelize');

// Add a vehicle (all good)
exports.createVehicle = async function (req, res) {
    // Validate request
    if (Object.keys(req.body).length === 0) {
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

// Update a vehicle (all good)
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
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                message: "Content can not be empty!"
            });
        };
        await Vehicle.update({
            model_make: req.body.model_make, 
            nickname: req.body.nickname, 
            type: req.body.type},
            { where: { vehicle_id: req.params.vehicle_id } });
        const updatedVehicle = await Vehicle.findByPk(vehicleId);
        res.json(updatedVehicle);
    } catch (err) {
        console.error(err);
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

// Search for a vehicle (all good BUT case sensitive)
exports.searchVehicles = async function (req, res) {
    try {
      const model_make = req.query.model_make;
      if (!model_make) {
        return res.status(400).json({ message: 'Model make parameter is missing' });
      }
      const Op = Sequelize.Op;
      const vehicles = await Vehicle.findAll({
        where: {
          model_make: {
            [Op.like]: `%${model_make}%`
          }
        }
      });
      res.json(vehicles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong...' });
    }
  };

// Fetch stats for a vehicle (almost good, returns string instead of int for total_minutes)
exports.getVehicleStats = async function (req, res) {
    // check if vehicle id exists
    const vehicleId = Number(req.params.vehicle_id);
        if (isNaN(vehicleId)) {
          return res.status(400).json({ message: 'Invalid vehicle ID' });
        }
    try {
        // check if vehicle exists
        const vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }
        const stats = await Usage.findAll({
        attributes: [
            [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('duration')), 0), 'total_minutes'],
            [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('fuel_amount')), 0), 'total_fuel_cost'],
            [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('maintenance_cost')), 0), 'total_maintenance_cost']
            ],
        where: { vehicle_id: vehicleId }
        });
        res.json(stats[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

    