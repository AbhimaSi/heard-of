const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
    songs: [{
        yID: { type: String, required: true },
        name: { type: String },
    }],
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel