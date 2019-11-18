/* eslint linebreak-style: ["error", "windows"] */
require('dotenv').config();
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const Helper = {

  // hash password
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(uid) {
    const token = jwt.sign({
      userId: uid,
    }, process.env.SECRET, { expiresIn: '2d' });
    return token;
  },
  validateUser(user) {
    const schema = {
      email: joi.string().min(6).required().email(),
      role: joi.string().required(),
      password: joi.string().min(6).required(),
      firstname: joi.string().min(3).required(),
      lastname: joi.string().min(3).required(),
      address: joi.string().min(4).required(),
      jobrole: joi.string().required(),
      gender: joi.string().required(),
      department: joi.string().required(),
    };
    const validation = joi.validate(user, schema);
    return validation;
  },
  validateLogin(user) {
    const schema = {
      email: joi.string().required().email(),
      password: joi.string().required(),
    };
    const validation = joi.validate(user, schema);
    return validation;
  },
  validateArticle(article) {
    const schema = {
      title: joi.string().min(6).required(),
      body: joi.string().min(30).required(),
    };
    const validation = joi.validate(article, schema);
    return validation;
  },
};
module.exports = Helper;
