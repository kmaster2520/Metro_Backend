const mongoose = require('mongoose');

const stationControlSchema = new mongoose.Schema({
  maxFare: Number,
  minFare: Number,
  allClosed: Boolean // true if metro is closed
});

module.exports = mongoose.model('stationcontrol', stationControlSchema, 'stationcontrol');