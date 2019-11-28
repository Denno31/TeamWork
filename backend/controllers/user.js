/* eslint linebreak-style: ["error", "windows"] */
const Helper = require('./Helper');
const db = require('../config/config');

// sign up a user
exports.signUp = async (req, res) => {
  // validate user
  const { error } = Helper.validateUser(req.body);
  if (error) {
    return res.send({ status: 'error', data: {message: error.details[0].message } });
  }
  const {
    password, email, role, firstname, lastname, department, jobrole, address, gender,
  } = req.body;
  // insert user into the dataabase
  try {
    const { rows } = await db.query('INSERT INTO users( password, email, role, firstname, lastname, gender, department, jobrole, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning*', [Helper.hashPassword(password), email.toLowerCase(), role, firstname, lastname, gender, department, jobrole, address]);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'User account successfully created',
        userId: rows[0].id,
      },
    });
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return res.status(400).json({ status: 'error', data: 'The email is already in use' });
    }
    return res.status(400).json({ status: 'err', data: err });
  }
};
exports.login = async (req, res) => {
  const { error } = Helper.validateLogin(req.body);
  if (error) return res.send({ status: 'error', data: error.details[0].message });
  const queryText = 'SELECT id, email, password, role FROM users where email=$1';
  try {
    const { rows } = await db.query(queryText, [req.body.email.toLowerCase()]);
    if (!rows[0]) return res.status(200).json({ status: 'err', data: 'The user does not exist' });
    if (!Helper.comparePassword(rows[0].password, req.body.password)) return res.status(200).json({ status: 'error', data: 'wrong email or password' });
    const token = Helper.generateToken({ id: rows[0].id, email: rows[0].email, role: rows[0].role });
    return res.status(200).json({ status: 'success', token, data: { email: rows[0].email, userId: rows[0].id } });
  } catch (error) {
    return res.status(400).json({ status: 'err', data: error });
  }
};
exports.delete = async (req, res) => {
  const userId = req.params.id;
  const queryText = 'DELETE FROM USERS WHERE id=$1 returning email';
  try {
    const { rows } = await db.query(queryText, [userId]);
    if (!rows[0]) {
      return res.status(400).json({ status: 'error', data: 'user was not found' });
    }
    return res.status(204).json({ status: 'success', data: 'user deleted successfully' });
  } catch (err) {
    return res.status(400).json({ status: 'error', data: err });
  }
};
exports.update = async (req, res) => {
  if (!req.params.id === req.user.userData.id || !req.user.userData.role  === 'admin') return res.status(400).json({ status: 'error', data: req.user.userData.role });
  const queryText = 'UPDATE users set password = $1, email = $2, role = $3, firstname = $4, lastname = $5, gender = $6, department = $7, jobrole = $8, address = $9 WHERE id = $10 returning email';
  try {
    const {
      password, email, role, firstname, lastname, department, jobrole, address, gender,
    } = req.body;
    const { rows } = await db.query(queryText, [Helper.hashPassword(password), email.toLowerCase(), role, firstname, lastname, gender, department, jobrole, address, req.params.id]);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: 'An error occured' });
    return res.status(200).json( { status: 'success', data: { user: rows[0] } } );
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};