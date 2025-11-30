const path = require('path')

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const userRouter = require(path.join(__dirname, './src/routes/userRoute'));
const loginRouter = require(path.join(__dirname, './src/routes/loginRoute'));

//const { cache } = require(path.join(__dirname, 'src/config/redis-cache.js'));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API PAGE');
})

app.use('/login', loginRouter);
app.use('/user', userRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening to ${port}`));