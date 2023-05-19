// load the things we need
// const bodyParser = require('body-parser');
// const session = require('express-session');
var express = require('express'); // import express framework
var cors = require('cors'); // import cors framework
var app = express(); // initialize express app

// cors
app.use(cors()); 
const port = process.env.NODE_PORT | 3000

// database ORM
const sequelize = require('./db.js'); // import database ORM
sequelize.sync(); // sync database

// json parser
app.use(express.json()); // for parsing application/json

// Routes
let routes = require('./routes'); // routes
app.use('/api', routes); // use routes (avec api comme préfixe)
app.use(function (req, res, next) {
    res.status(404).json({"error": "path not found"});
}); // Manage bad route

// Start server
app.listen(port);
console.log(port, ' is the magic port');
