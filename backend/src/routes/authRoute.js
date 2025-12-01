const path = require('path');
const express = require('express');
const authRouter = express.Router();
const { authController } = require(path.join(__dirname, './authController'));

authRouter.get('/', authController);

module.exports = authRouter;
