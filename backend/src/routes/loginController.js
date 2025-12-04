const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'SECRET';

const checkUser = async (name, password) => {
    const db = await getDB();
    const user = await db.collection('users').findOne({ name: name });
    try{
        if (!user) {
            throw new Error('Invalid username.');
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword){
            throw new Error('Invalid password.');
        }
        return correctPassword;
    }
    catch(err){
        throw err;
    }
}

const loginController = async (req, res) => {
    const { name, password } = req.body;
    try{
        if (!(await checkUser(name, password))){
            throw new Error('Error on logging in.')
        }

        const token = jwt.sign(name, secret, { algorithm: 'HS256' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60*60*1000,
        })

        res.status(200).json({ message: 'Logged in sucessfully.', token: token })
    }
    catch(err){
        res.status(400).json({ error: err });
    }

}

module.exports = loginController;