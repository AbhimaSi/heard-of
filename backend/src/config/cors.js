const cors = require('cors');

const corsConfig = () => {
    return cors({
        origin: 'https://localhost:5173',
        credentials: true
    })
}

module.exports = corsConfig;