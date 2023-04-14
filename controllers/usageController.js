// Charge models
const Usage = require('../models/usageModel')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')


// Add a usage (to test)
exports.createUsage = async function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    };
    // create a usage (non-persistent)
    let usage = Usage.build({
        vehicle_id: req.body.vehicle_id,
        user_id: req.body.user_id,
        duration: req.body.duration,
        date: req.body.date,
        fuel_amount: req.body.fuel_amount,
        maintenance_cost: req.body.maintenance_cost,
        not: req.body.note
    })
    // save usage to database
    usage.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(500).json({
            message: err.message || "Internal server error"
        }))
};

// Fetch a usage (to test)
exports.getUsage = async function (req, res) {
    Usage.findByPk(req.params.usage_id)
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(500).json({
            message: err.message || "Internal server error"
        }))
};

// Update a usage (to test)
exports.updateUsage = async function (req, res) {
    await Usage.update(
        {
            vehicle_id: req.body.vehicle_id,
            user_id: req.body.user_id,
            duration: req.body.duration,
            date: req.body.date,
            fuel_amount: req.body.fuel_amount,
            maintenance_cost: req.body.maintenance_cost,
            not: req.body.note
        },
        { where: { usage_id: req.params.usage_id } })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(500).json({
            message: err.message || "Internal server error"
        }))
};

// Delete a usage (to test)
exports.deleteUsage = async function (req, res) {
    await Usage.destroy({
        where: { usage_id: req.params.usage_id }
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(500).json({
            message: err.message || "Internal server error"
        }))
};

// Fetch all usages for a vehicle (to test)
exports.getUsages = async function (req, res) {
    Usage.findAll({
        where: { vehicle_id: req.params.vehicle_id }
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(500).json({
            message: err.message || "Internal server error"
        }))
};  