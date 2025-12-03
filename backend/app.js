const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const https = require('https');
const corsConfig = require(path.join(__dirname, './src/config/cors'));
const connectMongoose = require(path.join(__dirname, './src/config/mongoose'));
const initDB = require(path.join(__dirname, './src/config/initDB'));
const userRouter = require(path.join(__dirname, './src/routes/userRoute'));
const loginRouter = require(path.join(__dirname, './src/routes/loginRoute'));
const songRouter = require(path.join(__dirname, './src/routes/songRoute'));
const authRouter = require(path.join(__dirname, './src/routes/authRoute'));

const userAuth = require(path.join(__dirname, './src/routes/authMiddleware'));
//const { cache } = require(path.join(__dirname, 'src/config/redis-cache.js'));

(async () => await connectMongoose())();
(async () => await initDB())();


app.use(corsConfig())
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('HeardOf API');
})

app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/song', songRouter);

const privateKey = fs.readFileSync(path.join(__dirname, './src/config/certs/server.key'));
const certificate = fs.readFileSync(path.join(__dirname, './src/config/certs/server.crt'))

const credentials = {
    key: privateKey,
    cert: certificate
}

const httpsServer = https.createServer(credentials, app);

const port = 3000;
httpsServer.listen(port, () => console.log(`HTTPS: Listening to ${port}.`));