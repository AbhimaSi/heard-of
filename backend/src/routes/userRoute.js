const express = require('express');
const userRouter = express.Router();
const userSongsRouter = express.Router();
//const { validationResult, body } = require('express-validator');
//const bodyValidation = [body('user').notEmpty()]
const path = require('path');
const control = require(path.join(__dirname, './userController.js'));
const userAuth = require(path.join(__dirname, './authMiddleware.js'))

userRouter.get('/', userAuth, control.getUserController);
userRouter.post('/', control.postUserController);
userRouter.delete('/', control.deleteUserController);
userRouter.put('/', control.putUserController);

userSongsRouter.get('/', userAuth, control.getUserSongsController);
userSongsRouter.post('/', userAuth, control.postUserSongController);
userSongsRouter.delete('/', userAuth, control.deleteUserSongController);

userRouter.use('/song', userSongsRouter);

module.exports = userRouter;
