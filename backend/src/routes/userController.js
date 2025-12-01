const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const UserModel = require(path.join(__dirname, '../models/user'))

const getUsersController = async (req, res) => {
    const db = await getDB();
    const users = await db.collection('user').find().toArray();
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
    const { name, password } = req.body;
    const db = await getDB();
    const user = db.collection('user').findOne({ name: name });
    if (user){
        return res.status(409).json({ error: "Username already in use." })
    }
    UserModel.create({
        name: name,
        password: password
    })
    return res.status(200).json({ message: "User created." })
}

const deleteUserController = async (req, res) => {
    const {name} = req.body;
    const db = await getDB();
    const user = await db.collection('user').deleteOne({ name: name });
    if(!user){
        return res.status(404).json({ error: 'User not found.' })
    }
    return res.status(200).json({ message: "User deleted." })
}

const putUserController = async (req, res) => {
    const {name, password} = req.body;
    const db = await getDB();
    const user = await db.collection('user').updateOne({ name: name }, { $set: { password: password }});
    if(!user){
        return res.status(404).json({ error: 'User not found.' })
    }
    return res.status(200).json({ message: "Password updated." })
}

module.exports = {
    getUsersController,
    getUserController,
    postUserController,
    deleteUserController,
    putUserController
}