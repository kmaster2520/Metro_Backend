const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metroLineSchema = new Schema({
  name: String
});

module.exports = mongoose.model('metroline', userSchema, 'metro_lines');
