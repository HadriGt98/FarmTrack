// Charging the models
const db = require('./models/index')
const User = db.User
const jwt = require('jsonwebtoken')
const jwtKey = "my_secret_key"

// Login function 
exports.loginUser = async function (req, res) {
    await User.findOne({ where: { username: req.body.username, password: req.body.password } })
    .then(function (data) {
        if (data === null) {
            return res.status(404).json({ message: "User not found: wrong username or password" });
        }
        const jwtExpirySeconds = 300
            
        let payload = { id: data.user_id, is_admin: data.is_admin }; 
        let token = jwt.sign(payload, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds,
                })
        res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });   
    }).catch(err => {
        res.status(500).json({
            message: "Sorry, something went wrong..."
        });
    });
};

// Middleware for existing user
exports.isAuth = function (req, res, next) {
    if (typeof req.headers.authorization === "undefined") {
        // no autorization
        res.status(401).json({ message: "Not Authorized" });
    } else {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[0];
        console.log(token)
        console.log(jwtKey)
        // Here we validate that the JSON Web Token is valid 
        jwt.verify(token, jwtKey, (err, user) => {
            if (err) {  
                res.status(401).json({ message: "Not Authorized" });
            } else {
                req.user = user;
                // console.log(user);
                return next();
            };
        });
    }
};

// Middleware for admin
exports.isAdmin = function (req, res, next) {
    const level = req.user.is_admin;
    console.log("level", level)
    if (level === false) {
        res.status(403).json({ message: "Forbidden" });
    } else {
        // console.log("OK, you're good to go")
        return next();
    }
}