const jwt = require('jsonwebtoken');

const config = require('./config');

const generateToken = (payload) => (
  jwt.sign(payload, config.JWT_KEY, { expiresIn: '7d' })
);

module.exports = { generateToken };
