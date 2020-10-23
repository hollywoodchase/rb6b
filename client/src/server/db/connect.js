const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  password: 'abc123',
  host: 'localhost',
  port: 27017,
  database: 'bank'
});

module.exports = { pool };