const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const { HOST_URL, PORT, HOST, SQL_USER, SQL_PASSWORD, SQL_DATABASE } = process.env;

const pool = new Pool({
    user: SQL_USER,
    host: HOST_URL,
    database: SQL_DATABASE,
    password: SQL_PASSWORD,
    port: PORT,
    ssl: true
});

module.exports = pool;