const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));

const getSongsController = async (req, res) => {
    const { songs } = req.body.user;
    if(!songs){
        return res.status(400).json({ error: "User has no saved songs." })
    }
    res.status(200).json(songs)
}

const postSongController = async (req, res) => {
    const newSong = req.body.song;

    const songs = req.body.user.songs ? req.body.user.songs : [];

    songs.forEach((song) => {
        if(song.yID === newSong.yID){
            return res.status(200).json({ message: "Song is already saved." })
        }
    })
    
    const db = await getDB()
    await db.collection('user').updateOne({
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

const deleteSongController = async (req, res) => {
    let { song } = req.body;
    const db = await getDB();
    song = await db.collection('user').updateOne({
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
    getSongsController,
    postSongController,
    deleteSongController,
}