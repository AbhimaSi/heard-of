const path = require('path')
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const corsConfig = require(path.join(__dirname, './src/config/cors'));
const userRouter = require(path.join(__dirname, './src/routes/userRoute'));
const loginRouter = require(path.join(__dirname, './src/routes/loginRoute'));
const songRouter = require(path.join(__dirname, './src/routes/songRoute'));
const authRouter = require(path.join(__dirname, './src/routes/authRoute'));

const { userAuth } = require(path.join(__dirname, './src/routes/authController'));
//const { cache } = require(path.join(__dirname, 'src/config/redis-cache.js'));

app.use(corsConfig())
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {})

app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/song', songRouter);
app.use('/user', userRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening to ${port}`));