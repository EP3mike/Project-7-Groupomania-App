//routers for all user related endpoints ie login,signup, fetch user info, update user info, delete user info
const express = require('express');
const router = express.Router();

//middleware
const verifySignup = require('../middleware/verify'); // checks for duplicate accounts against current db users
const authorize = require('../middleware/auth');// jwt web token check

//controllers
const userController = require('../controllers/user');

//login & signup endpoints
router.post('/signup', verifySignup.checkDuplicate , userController.signup);
router.post('/login', userController.login)

//once logged in user info endpoints w/ jwt auth
router.get('/user/:id',authorize.verifyToken, userController.getUserById);
router.put('/user/:id',authorize.verifyToken, verifySignup.checkDuplicate , userController.updateUser) // maybe remove verify signup middleware
router.delete('/user/:id', authorize.verifyToken , userController.deleteUser);

module.exports = router;