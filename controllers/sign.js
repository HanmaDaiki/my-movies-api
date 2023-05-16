require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const TakenError = require('../errors/TakenError');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then(() => res.send({ message: 'Registration has been successfully completed' }));
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.identificationUser(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id.toString() },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token });
    });
};