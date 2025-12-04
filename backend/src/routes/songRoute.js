const express = require('express')
const songRouter = express.Router()

const path = require('path');
const control = require(path.join(__dirname, './songController.js'));
const cache = require(path.join(__dirname, '../config/redis-cache.js'));
const sanitizer = require(path.join(__dirname, '../config/sanitizer.js'));

songRouter.get('/', cache.route(), control.getSongsController);
songRouter.get('/:name', sanitizer.route(), cache.route(), control.getSongsByNameController);
songRouter.post('/', sanitizer.route(), cache.invalidate(), control.postSongController);
songRouter.delete('/', sanitizer.route(), cache.invalidate(), cache.invalidate('/user'), cache.invalidate('/user/song'), control.deleteSongController);
songRouter.put('/', sanitizer.route(), cache.invalidate(), cache.invalidate('/user'), cache.invalidate('/user/song'), control.putSongController);

module.exports = songRouter;