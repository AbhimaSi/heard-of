const jwt = require('jsonwebtoken');

const secret = 'SECRET';
jwt.secret = secret;

const payload = {'test':'test'}
const token = jwt.sign(payload, secret, { algorithm: 'HS256' })

console.log(token)

console.log(jwt.verify(token, secret))

