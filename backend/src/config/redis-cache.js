const redis = require('express-redis-cache');

const cache = redis({
    prefix: 'redis-cache',
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
});

cache.invalidate = (route) => {
    return (req, res, next) => {
        route = route ? route : req.originalUrl;
        if (!cache.connected){
            next();
            return;
        }
        cache.del(route+'*', (err) => console.log(err));
        next();
    }
}

module.exports = cache;