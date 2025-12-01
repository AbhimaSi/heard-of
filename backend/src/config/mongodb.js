const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017/db';

let client = null;
let db = null;

const getDB = async () => {
    try{
        if (client && db)
            return db;

        client = new MongoClient(url);
        await client.connect('db');
        db = client.db('db');

        console.log('Connected to DB');
        
        return db;
    }

    catch(err){
        throw err;
    }
}

module.exports = getDB;