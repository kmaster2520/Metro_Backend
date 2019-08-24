const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');

const jwtSecretKey = config.get('jwt.secret');
const keyLifespan = config.get('jwt.lifespan');

/*
TOKEN STRUCTURE: Same as User data model
*/
function create(payload) {
  return jwt.sign(payload, jwtSecretKey);
}

function decode(token) {
  try {
    return jwt.verify(token, jwtSecretKey);
  } catch (err) {
    return null;
  }
}

function verify(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ msg: 'Unauthorized'});
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token == null || token === 'null') {
    return res.status(401).send({ msg: 'Unauthorized'});
  }
  let payload = decode(token);
  if (!payload) {
    return res.status(401).send({ msg: 'Unauthorized'});
  }
  if (moment.unix() -  payload.iat >= keyLifespan) {
    return res.status(401).send({ msg: 'Session Expired'});
  }
  req.user = payload;
  next();
}

module.exports = { create, verify };