const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDBTVSERIESLIST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
