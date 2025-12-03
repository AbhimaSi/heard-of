const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    yID: { type: String, required: true },
    name: { type: String, required: true }
})

const SongModel = mongoose.model('songs', songSchema)

module.exports = SongModel;