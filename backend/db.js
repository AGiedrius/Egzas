
const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
