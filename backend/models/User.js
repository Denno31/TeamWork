/* eslint linebreak-style: ["error", "windows"] */
// eslint-disable-next-line no-unused-vars
const pool = require('../config/config.js');
// user constructor
class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }

  // save new user in databese
  createUser(res) {
    pool.connect((err, client, done) => {
      done();
      if (err) return res.status(400).json({ err });
      client.query('INSERT INTO users (username, email, password, role) VALUES($1, $2, $3, $4)', [this.username, this.email, this.password, this.role], (error) => {
        if (error) return res.json({ error });
        return res.json({ message: 'created successfully' });
      });
    });
  }

  // get a single user
  static checkEmailExists(email, res) {
    pool.connect((err, client, done) => {
      if (err) return res.status(400).json(err);
      const textQuery = 'SELECT email FROM users WHERE email=$1';
      client.query(textQuery, [email], (err, result) => {
        if (err) return res.status(400).json(err);
        console.log(result.rowCount);
        if (result.rowCount > 0) return res.json({message: 'The email is already in use' });
      });
    });
  }
}

module.exports = User;
