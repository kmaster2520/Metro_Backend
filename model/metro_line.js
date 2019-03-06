const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metroLineSchema = new Schema({
  name: String
});

module.exports = mongoose.model('metroline', metroLineSchema, 'metro_lines');
