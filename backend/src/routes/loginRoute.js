const path = require('path');
const express = require('express');
const loginRouter = express.Router();
const loginController = require(path.join(__dirname, './loginController'));
const sanitizer = require(path.join(__dirname, '../config/sanitizer.js'));

loginRouter.post('/', sanitizer.route(), loginController);

module.exports = loginRouter;
