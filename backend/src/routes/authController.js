const path = require('path');
const getDB = require(path.join(__dirname, '../config/mongodb'));
const jwt = require('jsonwebtoken');

// Auth controller
const authController = async (req, res) => {
    const { token } = req.cookies;
    console.log(req.cookies.token);
    if (!token){
        return res.status(400).json({ error: 'Client must provide a token.' });
    }
    const name = jwt.verify(token, "SECRET");
    const db = await getDB();
    const user = await db.collection('user').findOne({ name: name });
    if (!user){
        return res.status(400).json({ error: 'Invalid token.' });
    }
    res.status(200).json({ token: token })
}

// Auth middleware
const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        console.log(token, "<------- TOKEN")
        if (!token){
            throw new Error("TokenNeeded");
        }
        const name = jwt.verify(token, 'SECRET');
        const db = await getDB();
        console.log(name);
        const user = await db.collection('user').findOne({ name: name });
        if (!user){
            throw new Error("InvalidToken");
        }

        if(!req.body){
            req.body = {}
        }
        req.body.user = user;
        console.log(req.body.user)
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

module.exports = {
    authController,
    userAuth,
}