const express = require('express')
const songRouter = express.Router()

const path = require('path');
const control = require(path.join(__dirname, './songController.js'));

songRouter.get('/', control.getSongsController);
songRouter.get('/:name', control.getSongsByNameController);
songRouter.post('/', control.postSongController);
songRouter.delete('/', control.deleteSongController);
songRouter.put('/', control.putSongController);

module.exports = songRouter;