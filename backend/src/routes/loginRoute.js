const path = require('path');
const express = require('express');
const loginRouter = express.Router();
const loginController = require(path.join(__dirname, './loginController'));
const sanitizer = require(path.join(__dirname, '../config/sanitizer.js'));
const { body } = require('express-validator');

const login_validator = [ 
    body('name').exists().isString().trim().notEmpty(),
    body('password').exists().isString().trim().notEmpty(),
 ]

loginRouter.post('/', login_validator, sanitizer.route(), loginController);

module.exports = loginRouter;
