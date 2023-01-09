const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { rawListeners } = require('process');
const jwtConfig = require('../config/authConfig'); // jwt secret key
const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op; // sequelize operators 

//create and save a new user ie signup
exports.signup = (req, res, next) => {
    //Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
        .then(user => {
            res.send({ message: "User registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//login by existing users so compare email/ hashed password to db
exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if(!user) {
                return res.status(404).send({ message: "User not found!"});
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if(!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password"
                });
            }
            const token = jwt.sign({ id: user.id }, jwtConfig.secret, {expiresIn: '24h'});
            res.status(200).send({
                id: user.id,
                // username: user.username,
                // email: user.email,
                accessToken: token
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//retrieves user by specific id
exports.getUserById = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error fetching user with id= " + userId
            });
        });
};

//updates user info
exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    User.update(req.body, {
        where: { id: userId}
    })
        .then(num => {
            // if 1 row affected then our user was updated correctly
            if(num == 1) {
                res.send({ message: 'User updated successfully!'});

            } else {
                res.send({
                    message: 'Cannot update user with id= ' + userId
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating post with id= ' + userId
            });
        });
};

//delete user info
exports.deleteUser= (req, res, next) => {
    const userId = req.params.id;
    User.destroy({
        where: { id: userId}
    })
        .then(num => {
            // if 1 row affected then our user was updated correctly
            if(num == 1) {
                res.send({ message: 'User deleted successfully!'});

            } else {
                res.send({
                    message: 'Cannot delete user with id= ' + userId
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error deleting user with id= ' + userId
            });
        });
};