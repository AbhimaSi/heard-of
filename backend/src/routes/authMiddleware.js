const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const jwt = require('jsonwebtoken');

const secret = "SECRET";

const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if (!token){
            throw new Error("TokenNeeded");
        }
        const name = jwt.verify(token, secret);
        const db = await getDB();
        const user = await db.collection('users').findOne({ name: name });
        if (!user){
            throw new Error("InvalidToken");
        }

        if(!req.body){
            req.body = {}
        }
        req.body.user = user;
        next();
    }
    catch(err){
        console.log(err)
        switch (err) {
            case "TokenNeeded":
                return res.status(400).json({ error: 'Client must provide a token.' });
            case "InvalidToken":
                return res.status(400).json({ error: 'Invalid token.' });
            default:
                return res.status(400).json({ error: 'Authentication Failed.' });
        }
    }
}

module.exports = userAuth;