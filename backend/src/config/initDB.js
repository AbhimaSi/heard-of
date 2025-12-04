// DB test module

const getDB = require('./mongodb');

const songs = [
    { yID: "WdW48xSbb9s", name: "The Mixed Tape"},
    { yID: "psuRGfAaju4", name: "Fireflies" },
    { yID: "RRKJiM9Njr8", name: "Welcome To The Black Parade" },
    { yID: "X9fLbfzCqWw", name: "Ocean Avenue" },
    { yID: "eBG7P-K-r1Y", name: "Everlong" },
    { yID: "SBjQ9tuuTJQ", name: "The Pretender" },
    { yID: "7iNbnineUCI", name: "The Kids Aren't Alright" },
    { yID: "7QU1nvuxaMA", name: "Like a Stone" },
    { yID: "L_jWHffIx5E", name: "All Star" },
    { yID: "Ijk4j-r7qPA", name: "Take Me Out" },
    { yID: "bpOSxM0rNPM", name: "Do I Wanna Know?" },
    { yID: "lL2ZwXj1tXM", name: "Never Too Late" },
    { yID: "cjVQ36NhbMk", name: "How To Save A Life" },
    { yID: "0xyxtzD54rM", name: "Given Up" }
]

const users = [
    { name: "User", password: "$2b$10$e4mLdfwVx2p33tBBy6YYEu56n5VPBnAffs/O65NA6HQqRx0vPhTEW" },     // pass: 1234
    { name: "Abhimael", password: "$2b$10$muO564VF0jmkvK0BMQdanOdG5Qys.6PwXnJ4JvlJWeigL0NMvPr6i" }  // pass: 1234
]

const initializeDB = async () => {
    try{
        const db = await getDB();
        const hasCollections = (await db.listCollections().toArray()).length ? true : false;
        if (hasCollections){
            throw new Error("Already set.");
        }
        await db.collection('users').insertMany(users);
        await db.collection('songs').insertMany(songs);
        console.log('Database was setted sucessfuly.');
    }
    catch(err){
        console.log(`Couldn't setup database. ${err.message}`);
    }
}

module.exports = initializeDB;