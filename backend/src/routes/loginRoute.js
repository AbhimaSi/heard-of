const path = require('path');
const express = require('express');
const loginRouter = express.Router();
const loginController = require(path.join(__dirname, './loginController'));

loginRouter.post('/', loginController);

module.exports = loginRouter;
