const { MongoClient } = require('mongodb')
const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/db' ;

//'mongodb://127.0.0.1:27017/db'

let client = null;
let db = null;

const getDB = async () => {
    try{
        if (client && db)
            return db;

        client = new MongoClient(url);
        await client.connect('db');
        db = client.db('db');

        console.log('Connected to MongoDB.');
        
        return db;
    }

    catch(err){
        throw err;
    }
}

module.exports = getDB;