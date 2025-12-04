const express = require('express');
const userRouter = express.Router();
const userSongsRouter = express.Router();
//const { validationResult, body } = require('express-validator');
//const bodyValidation = [body('user').notEmpty()]
const path = require('path');
const control = require(path.join(__dirname, './userController.js'));
const userAuth = require(path.join(__dirname, './authMiddleware.js'));
const cache = require(path.join(__dirname, '../config/redis-cache.js'));
const sanitizer = require(path.join(__dirname, '../config/sanitizer.js'));

userRouter.get('/', cache.route(), userAuth, control.getUserController);
userRouter.post('/', sanitizer.route(), cache.invalidate(), control.postUserController);
userRouter.delete('/', sanitizer.route(), cache.invalidate(), control.deleteUserController);
userRouter.put('/', sanitizer.route(), cache.invalidate(), control.putUserController);

userSongsRouter.get('/', cache.route(), userAuth, control.getUserSongsController);
userSongsRouter.post('/', sanitizer.route(), cache.invalidate('/user'),userAuth, control.postUserSongController);
userSongsRouter.delete('/', sanitizer.route(), cache.invalidate('/user'), userAuth, control.deleteUserSongController);

userRouter.use('/song', userSongsRouter);

module.exports = userRouter;
