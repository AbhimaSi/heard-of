const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const jwt = require('jsonwebtoken');

const secret = "SECRET";

// Auth controller
const authController = async (req, res) => {
    const { token } = req.cookies;
    if (!token){
        return res.status(400).json({ error: 'Client must provide a token.' });
    }
    const name = jwt.verify(token, secret);
    const db = await getDB();
    const user = await db.collection('users').findOne({ name: name });
    if (!user){
        return res.status(400).json({ error: 'Invalid token.' });
    }
    res.status(200).json({ token: token })
}

module.exports = authController;