const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "grocery_store",
  password: "ThunderGeatsIX9787",
  port: 5432,
});

module.exports = pool;
