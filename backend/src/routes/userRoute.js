const express = require('express')
const userRouter = express.Router()
//const { validationResult, body } = require('express-validator');
//const bodyValidation = [body('user').notEmpty()]

const path = require('path');
const c = require(path.join(__dirname, './userController.js'));
const { userAuth } = require(path.join(__dirname, './authController.js'))

userRouter.get('/', userAuth, c.getUserController);
userRouter.post('/', c.postUserController);
userRouter.delete('/', c.deleteUserController);
userRouter.put('/', c.putUserController);
userRouter.get('/', c.getUsersController);

module.exports = userRouter;
