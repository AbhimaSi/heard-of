const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const UserModel = require(path.join(__dirname, '../models/user'));

const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return hash;
} 
//TODO VERIFY FIELDS
// User
const getUsersController = async (req, res) => { // unused
    const db = await getDB();
    const users = await db.collection('users').find().toArray();
    if(!users){
        return res.status(404).json({ error: 'Users not found.' })
    }
    console.log(users);
    return res.status(200).json(users)
}

const getUserController = async (req, res) => {
    const { user } = req.body;
    console.log(user)
    res.status(200).json(user)
}

const postUserController = async (req, res) => {
    try{
        const { name, password } = req.body;
        const hash = await hashPassword(password);
        const db = await getDB();
        const user = await db.collection('users').findOne({ name: name });
        if (user){
            return res.status(409).json({ error: "Username already in use." })
        }
        await UserModel.create({
            name: name,
            password: hash
        })
        return res.status(200).json({ message: "User created." })
    }
    catch(err){
        return res.status(500).json({ error: "Unable to create user." })
    }
}

const deleteUserController = async (req, res) => {
    const {name} = req.body;
    const db = await getDB();
    const user = await db.collection('users').deleteOne({ name: name });
    if(!user){
        return res.status(404).json({ error: 'User not found.' })
    }
    return res.status(200).json({ message: "User deleted." })
}

const putUserController = async (req, res) => {
    const {name, password} = req.body;
    const db = await getDB();
    const user = await db.collection('users').updateOne({ name: name }, { $set: { password: password }});
    if(!user){
        return res.status(404).json({ error: 'User not found.' })
    }
    return res.status(200).json({ message: "Password updated." })
}

// User liked songs
const getUserSongsController = async (req, res) => {
    const { songs } = req.body.user;
    if(!songs){
        return res.status(400).json({ error: "User has no saved songs." })
    }
    res.status(200).json(songs)
}

const postUserSongController = async (req, res) => {
    const newSong = req.body.song;

    const songs = req.body.user.songs ? req.body.user.songs : [];

    songs.forEach((song) => {
        if(song.yID === newSong.yID){
            return res.status(200).json({ message: "Song is already saved." })
        }
    })
    
    const db = await getDB()
    await db.collection('users').updateOne({
        name: req.body.user.name
    },
    {
        $push: {
            songs: {
                yID: newSong.yID,
                name: newSong.name
            }
        }
    })

    return res.status(200).json({ message: "Song saved in user songs." })
}

const deleteUserSongController = async (req, res) => {
    let { song } = req.body;
    const db = await getDB();
    song = await db.collection('users').updateOne({
        name: req.body.user.name,
    },
    {
        $pull: {
            songs: {
                yID: song.yID
            }
        }
    });

    if(!song){
        return res.status(404).json({ error: 'Song not found.' })
    }

    return res.status(200).json({ message: "Song deleted." })
}

module.exports = {
    getUsersController,
    getUserController,
    postUserController,
    deleteUserController,
    putUserController,
    getUserSongsController,
    postUserSongController,
    deleteUserSongController
}