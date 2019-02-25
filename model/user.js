const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  p_hash: String,
  role: Number
});

module.exports = mongoose.model('user', userSchema, 'users');
