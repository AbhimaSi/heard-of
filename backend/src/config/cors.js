const cors = require('cors');

const corsConfig = () => {
    return cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
}

module.exports = corsConfig;