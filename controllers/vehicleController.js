// Charge models
const Usage = require('../models/usageModel')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')

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
    .then(data => {
        res.json(data);
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
    if (!req.params.vehicle_id) {
        res.status(400).json({
            message: "Catergory not found!"
        });
    } else {
        Vehicle.findByPk(req.params.vehicle_id)
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(500).json({
            message: err.message || "Internal server error"
        }))
    };
};

// Update a vehicle (to test; add validation of id)
exports.updateVehicle = async function (req, res) {
    await Vehicle.update(
        {
        model_make: req.body.model_make, 
        nickname: req.body.nickname, 
        type: req.body.type}, 
        { where: { vehicle_id: req.params.vehicle_id } })
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(500).json({
        message: err.message || "Internal server error"
    }))
};

// Delete a vehicle (to test, add validation of id)
exports.deleteVehicle = async function (req, res) {
    await Vehicle.destroy({ where: { vehicle_id: req.params.vehicle_id } })
    .then(data => {
        res.status(204).json({ message: "Vehicle deleted successfully" });
    })
    .catch(error => res.status(500).json({
        message: err.message || "Internal server error"
    }))
};

// Search for vehicle (to test)
exports.searchVehicle = async function (req, res) {
    await Vehicle.findAll({ where: { model_make: req.params.model_make } })
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(500).json({
        message: err.message || "Internal server error"
    }))
};

// Fetch stats for a vehicle (to write)