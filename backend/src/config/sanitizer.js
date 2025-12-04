const sanitizer = require('perfect-express-sanitizer');

sanitizer.route = () => {
    return sanitizer.clean({
        xss: true,
        noSql: true,
        level: 5,
    });
}

module.exports = sanitizer;