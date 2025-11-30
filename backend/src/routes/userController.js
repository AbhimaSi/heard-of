const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const UserModel = require(path.join(__dirname, '../models/user'))

const getUsersController = async (req, res) => {

}

const getUserController = async (req, res) => {
    const { name } = req.params;
    const db = await getDB();
    const user = await db.collection('user').findOne({name: name});
    if(!user){
        return res.status(404).json({ error: 'User not found.' })
    }
    res.json(user)
}

const postUserController = async (req, res) => {
    const { name, password } = req.body;
    UserModel.create({
        name: name,
        password: password
    })
}

const deleteUserController = async (req, res) => {

}

const putUserController = async (req, res) => {

}

module.exports = {
    getUsersController,
    getUserController,
    postUserController,
    deleteUserController,
    putUserController
}