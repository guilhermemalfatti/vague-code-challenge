"use strict";
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

module.exports = {
    db: {
        host: process.env.DB_HOSTNAME || '127.0.0.1',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },

    Redis: {
        Host: process.env.REDIS_HOST,
        Port: process.env.REDIS_PORT,
        Prefix: process.env.PREFIX,
        TTL: parseInt(process.env.CACHE_REDIS_TTL)
    }
};
