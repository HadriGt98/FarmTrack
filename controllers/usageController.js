// Charge models
const Usage = require('../models/usageModel')
const User = require('../models/userModel')
const Vehicle = require('../models/vehicleModel')


// Add a usage (all good)
exports.createUsage = async function (req, res) {
    // Validate request
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Content can not be empty!" });
    }
  
    try {
      // check if vehicle id exists
      const vehicleId = Number(req.body.vehicle_id);
      if (isNaN(vehicleId)) {
        return res.status(400).json({ message: 'Invalid vehicle ID' });
      }
      // check if vehicle exists
      const vehicle = await Vehicle.findOne({ where: { vehicle_id: vehicleId } });
      if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle ID does not exist' });
      }

      // create a usage (non-persistent)
      let usage = Usage.build({
        vehicle_id: req.body.vehicle_id,
        user_id: req.body.user_id,
        duration: req.body.duration,
        date: req.body.date,
        fuel_amount: req.body.fuel_amount,
        maintenance_cost: req.body.maintenance_cost,
        note: req.body.note
      });
  
      // save usage to database
      usage.save()
        .then(data => {
          res.json(data);
        })
        .catch(error => res.status(500).json({
          message: error.message || "Internal server error"
        }));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong...' });
    }
  };

// Fetch a usage (all good)
exports.getUsage = async function (req, res) {
    try {
        const usageId = Number(req.params.usage_id);
        if (isNaN(usageId)) {
          return res.status(400).json({ message: 'Invalid usage ID' });
        }
        const usage = await Usage.findByPk(usageId);
        if (!usage) {
          return res.status(404).json({ message: 'Usage not found' });
        }
        res.json(usage);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong...' });
      }
};

// Update a usage (all good)
exports.updateUsage = async function (req, res) {
    try {
      // Validate request
      console.log(req.body)
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Content can not be empty!" });
      }
  
      // check if usage id is a number
      const usageId = Number(req.params.usage_id);
      if (isNaN(usageId)) {
        return res.status(400).json({ message: 'Invalid usage ID' });
      }
  
      // check if usage exists
      const usage = await Usage.findByPk(usageId);
      if (!usage) {
        return res.status(404).json({ message: 'Usage not found' });
      }
  
      // update usage
      await usage.update({
        vehicle_id: req.body.vehicle_id,
        user_id: req.body.user_id,
        duration: req.body.duration,
        date: req.body.date,
        fuel_amount: req.body.fuel_amount,
        maintenance_cost: req.body.maintenance_cost,
        note: req.body.note
      });
  
      // return updated usage
      return res.json(usage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  };

// Delete a usage (all good)
exports.deleteUsage = async function (req, res) {
    try {
        const usageId = Number(req.params.usage_id);
        if (isNaN(usageId)) {
            return res.status(400).json({ message: 'Invalid usage ID' });
        }
        const usage = await Usage.findByPk(usageId);
        if (usage) {
            await usage.destroy();
            res.json({ message: 'Usage deleted successfully' });
        } else {
            res.status(404).json({ error: 'Usage not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Fetch all usages for a vehicle (all good)
exports.getUsages = async function (req, res) {
    try {
        // check if vehicle id exists
        const vehicleId = Number(req.params.vehicle_id);
        if (isNaN(vehicleId)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        } 
        // check if vehicle exists
        const vehicle = await Vehicle.findOne({ where: { vehicle_id: vehicleId } });
        if (!vehicle) {
            return res.status(400).json({ message: 'Vehicle ID does not exist' });
        }
        // get usages
        const usage = await Usage.findAll({ where: { vehicle_id: req.params.vehicle_id } });
        console.log(usage)
        if (usage.length === 0) {
            return res.status(404).json({ message: 'No usages found for the vehicle' });
        }
        res.json(usage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};  