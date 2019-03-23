const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  name: String,
  line: String,
  isOpen: Boolean,
  Fare: Number
});

module.exports = mongoose.model('station', stationSchema, 'stations');
