const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const SongModel = require(path.join(__dirname, '../models/song'));
const { validationResult } = require('express-validator');

const getSongsController = async(req, res) => {
    const db = await getDB()
    const songs = await db.collection('songs').find().toArray();

    if(!songs){
        return res.json({ error: "No songs found." })
    }
    return res.json(songs)
}

const getSongsByNameController = async(req, res) => {
    const { name } = req.params;

    const db = await getDB();
    const songs = await db.collection('songs').find({ name: { $regex: `^${name}`, $options: 'i' } }).toArray();

    if(!songs){
        return res.json({ error: "No songs found." });
    }
    return res.json(songs);
}

const getSongController = async (req, res) => {
    const { name } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ error: "Invalid name." })
    }

    const db = await getDB()
    const song = await db.collection('songs').findOne({ name: name });

    if(!song){
        return res.json({ error: "No songs found." })
    }
    return res.status(200).json(songs)
}

const postSongController = async (req, res) => {
    try{
        const { yID, name } = req.body;
        console.log(yID, name)

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ error: "Invalid song data." })
        }

        await SongModel.create({
            yID: yID,
            name: name
        });

        return res.status(200).json({ message: "Song added sucessfuly." })
    }
    catch(err){
        console.log(err);
        return res.json({ err: "Unable to create song." })
    }

}

const deleteSongController = async (req, res) => {
    
}

const putSongController = async (req, res) => {
    
}

module.exports = {
    getSongsController,
    getSongsByNameController,
    getSongController,
    postSongController,
    deleteSongController,
    putSongController,
}