// Charging the models
const db = require('./models/index')
const User = db.User
const jwt = require('jsonwebtoken')
const jwtKey = "my_secret_key"

// Login function 
exports.loginUser = async function (req, res) {
    await User.findOne({ where: { username: req.body.username, password: req.body.password } }) // find user in db
    .then(function (data) {
        if (data === null) { // if user not found (returns null), return error
            return res.status(404).json({ message: "User not found: wrong username or password" });
        }
        // else, create token
        const jwtExpirySeconds = 3200
        let payload = { user_id: data.user_id, username:data.username, is_admin: data.is_admin }; // is_admin is a needed to test if user is admin (see isAdmin)
        let token = jwt.sign(payload, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds,
                })
        res.status(200).json({ "token": token, "maxAge": jwtExpirySeconds }); // return token
    }).catch(err => {
        res.status(500).json({ message: "Sorry, something went wrong..." });
    });
};

// Middleware to check if user is logged in
exports.isAuth = function (req, res, next) {
    // console.log(req.headers.authorization)
    if (typeof req.headers.authorization === "undefined") {
        // no autorization defined so user is not logged in
        res.status(401).json({ message: "Access unauthorized, please connect" });
    } else {
        // retrieve token from header
        let token = req.headers.authorization.split(" ")[0];
        // console.log(token)
        // console.log(jwtKey)
        // check if token is valid 
        jwt.verify(token, jwtKey, (err, user) => {
            if (err) {  
                res.status(401).json({ message: "Access unauthorized" });
            } else {
                req.user = user; // set user in request
                // console.log(user);
                return next(); // continue to next middleware (or function)
            };
        });
    }
};

// Middleware to check if user is admin
exports.isAdmin = function (req, res, next) {
    const level = req.user.is_admin; // get is_admin from request (either true or false)
    // console.log("level", level)
    if (level === false) {
        res.status(418).json({ message: "I'm a teapot" }); // if user is not admin, return error (joke because i like it)
    } else {
        // console.log("OK, you're good to go")
        return next(); // else, continue to function
    }
}