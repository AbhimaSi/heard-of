const mongoose = require('mongoose')
const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/db';

const connectDB = async () => {
    try{
        await mongoose.connect(url)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;