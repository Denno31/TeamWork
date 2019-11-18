/* eslint linebreak-style: ["error", "windows"] */
require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

const DB = {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = DB;
