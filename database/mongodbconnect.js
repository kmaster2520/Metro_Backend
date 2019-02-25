const mongoose = require('mongoose');
const User = require('../model/user');

/*const lineSchema = new Schema({
  name: String
});
const lineModel = mongoose.model('line', lineSchema, 'metro_lines');*/

class MongoDBConnection {

  constructor(dbInfo) {
    const db_connection_string = `mongodb+srv://${dbInfo.user}:${dbInfo.password}@${dbInfo.database}`;
    mongoose.connect(db_connection_string, err => {
      if (err) {
        console.log('Error ' + err);
      } else {
        console.log('Connected to mongodb');
      }
    });
  }

  registerUser(username, hash, callback) {
    const user = User({username, p_hash: hash, role: 0});
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err);
      } else {
        callback(registeredUser);
      }
    });
  }

  getUserByName(username, callback) {
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        callback(user);
      }
    });
  }

  /*
  getRails(callback) {
    lineModel.find({}, (err, lines) => {
      if (err) {
        console.log(err);
      } else {
        callback(lines);
      }
    });
  }
  */

}

module.exports = MongoDBConnection;