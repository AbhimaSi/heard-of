const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const jwt = require('jsonwebtoken');

const secret = 'SECRET';

const loginController = async (req, res) => {
    console.log(req.body)
    const { name, password } = req.body;
    const db = await getDB();
    const user = await db.collection('user').findOne({ name: name });
    console.log(user)
    if (!user) {
        return res.status(404).json({error: 'User not found.'});
    }
    if (user.password != password){
        return res.status(401).json({ error: 'Invalid password.' })
    }

    const token = jwt.sign(user.name, secret, { algorithm: 'HS256' });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60*60*1000
    })

    res.status(200).json({ message: 'Logged in sucessfully.', token: token })
}

module.exports = loginController;