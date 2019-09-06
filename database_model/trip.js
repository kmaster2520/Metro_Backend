const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  username: String,
  start: Date,
  end: Date,
  fare: Number
});

module.exports = mongoose.model('trip', tripSchema, 'trips');
