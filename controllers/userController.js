// Charging the models
const db = require('../models/index')
const User = db.User

// Create and Save a new User (Okay, just hash the password)
exports.createUser = async function(req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    };
    // Create a User (non-persistent)
    let user = User.build({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password // Still to do : hash this shit
    });
    // Save User in the database
    await user.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Internal server error"
            });
        });
};