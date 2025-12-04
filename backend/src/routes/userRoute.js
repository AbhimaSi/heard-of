const express = require('express');
const userRouter = express.Router();
const userSongsRouter = express.Router();
//const { validationResult, body } = require('express-validator');
//const bodyValidation = [body('user').notEmpty()]
const path = require('path');
const { body, cookie } = require('express-validator');
const control = require(path.join(__dirname, './userController.js'));
const userAuth = require(path.join(__dirname, './authMiddleware.js'));
const cache = require(path.join(__dirname, '../config/redis-cache.js'));
const sanitizer = require(path.join(__dirname, '../config/sanitizer.js'));

const user_validator = [
    body('name').isString().trim().notEmpty(),
    body('password').isString().trim().notEmpty()
]
const name_validator = [
    body('name').isString().trim().notEmpty()
]

const song_validator = [ 
    body('name').isString().trim().notEmpty(),
    body('yID').isString().trim().notEmpty(),
]
const song_name_validator = [ 
    body('name').isString().trim().notEmpty(),
]

const token_validator = [
    cookie('token').exists().notEmpty()
]


userRouter.get('/', token_validator, userAuth, cache.route(), control.getUserController);
userRouter.post('/', user_validator, sanitizer.route(), cache.invalidate(), control.postUserController);
userRouter.delete('/', name_validator, sanitizer.route(), cache.invalidate(), control.deleteUserController);
userRouter.put('/', user_validator, sanitizer.route(), cache.invalidate(), control.putUserController);

userSongsRouter.get('/', userAuth, cache.route(), control.getUserSongsController);
userSongsRouter.post('/', token_validator, song_validator, userAuth, sanitizer.route(), cache.invalidate('/user'), control.postUserSongController);
userSongsRouter.delete('/', token_validator, song_name_validator, userAuth, sanitizer.route(), cache.invalidate('/user'), control.deleteUserSongController);

userRouter.use('/song', userSongsRouter);

module.exports = userRouter;
