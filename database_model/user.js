const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  p_hash: String,
  isSuspended: Boolean,
  dateCreated: Date,
  role: String // 'A' = admin, 'U' = user, 'M' = station manager
});

module.exports = mongoose.model('user', userSchema, 'users');
