//middleware to authenticate users using jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require("../config/authConfig");
const db = require('../models');
const User = db.users;

verifyToken = (req, res, next) => {
    // const token = req.headers.authorization.split(' ')[1];
    let token = req.headers["x-access-token"];
    console.log(token);

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: "Unauthorized request!"
            });
        }
        
        //req.user.id or req.id instead of lhs?
        req.userId = decoded.id;
        // req.user.id = decoded;
        next();
    });

};

const auth = {
    verifyToken: verifyToken
};

module.exports = auth;