const express = require('express')
const userRouter = express.Router()
const { validationResult, param } = require('express-validator');
const paramValidation = [param('name').notEmpty()]

const path = require('path');
const c = require(path.join(__dirname, './userController.js'));

userRouter.get('/:name', paramValidation, c.getUserController);
userRouter.post('/:name', paramValidation, c.postUserController);
userRouter.delete('/:name', paramValidation, c.deleteUserController);
userRouter.put('/:name', paramValidation, c.putUserController);
userRouter.get('/', c.getUsersController);

module.exports = userRouter;
