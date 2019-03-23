const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const smartcardSchema = new Schema({
  number: String,
  balance: Number, // stored in credits $1 = 100 credits
  active: Boolean,
  suspended: Boolean,
  suspendedUntil: Date,
  dateCreated: Date,
  dateExpired: Date
});

module.exports = mongoose.model('smartcard', smartcardSchema, 'smartcard');