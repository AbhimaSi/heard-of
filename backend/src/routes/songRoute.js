const express = require('express')
const songRouter = express.Router()

const path = require('path');
const c = require(path.join(__dirname, './songController.js'));
const { userAuth } = require(path.join(__dirname, './authController.js'))

songRouter.get('/', userAuth, c.getSongsController);
songRouter.post('/', userAuth, c.postSongController);
songRouter.delete('/', userAuth, c.deleteSongController);

module.exports = songRouter;
