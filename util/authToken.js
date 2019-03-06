const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSecretKey = config.get('jwtSecretKey');

function create(payload) {
  return jwt.sign(payload, jwtSecretKey);
}

function verify(token) {
  return jwt.verify(token, jwtSecretKey);
}

module.exports = { create, verify };