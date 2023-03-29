// load the things we need
// const bodyParser = require('body-parser');
// const session = require('express-session');
var express = require('express'); // import express framework
var app = express(); // initialize express app

// database ORM
const sequelize = require('./db.js'); // import database ORM
sequelize.sync(); // sync database

// json parser
app.use(express.json()); // for parsing application/json

// Routes
let routes = require('./routes'); // routes
app.use('/', routes); // use routes
app.use(function (req, res, next) {
    res.status(404).json({"error": "path not found"});
}); // Manage bad route

// Start server
app.listen(8080);
console.log('8080 is the magic port');