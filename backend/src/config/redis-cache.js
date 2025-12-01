const redis = require('express-redis-cache'),
    cache = redis({
        prefix: 'redis-cache',
        host: 'localhost',
        port: 6379
    })

cache.invalidate = (route) => {
    return (req, res, next) => {
        const route = route ? route : req.url;
        if (!cache.connected){
            next();
            return;
        }
        cache.del(route, (err) => console.log(err));
        next();
    }
}

module.exports = cache;