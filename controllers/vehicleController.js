// Charge models
const Usage = require('../models/usageModel')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')

// Add a vehicle
const addVehicle = (req, res) => {
    const vehicle = new Vehicle(req.body.model_make, req.body.nickname, req.body.type)
    vehicle.save()
    .then(() => {
        res.status(201).json({
            message: 'Vehicle successfully added!'
        })
    })
    .catch(error => res.status(400).json({ error }))
}
// Fetch a vehicle
const getVehicle = (req, res) => {
};

// Update a vehicle

// Delete a vehicle

// Fetch all vehicles

// Fetch stats for a vehicle