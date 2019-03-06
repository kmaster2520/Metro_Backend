const mongoose = require('mongoose');
const User = require('../model/user');
const MetroLine = require('../model/metro_line');


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
        callback(null);
      } else {
        callback(registeredUser);
      }
    });
  }

  getUserByName(username, callback) {
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log(err);
        callback(null);
      } else {
        callback(user);
      }
    });
  }

  getRails(callback) {
    MetroLine.find({}, (err, lines) => {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        let lines_ = [];
        for (let line of lines) {
          lines_.push(line.name);
        }
        callback(lines_);
      }
    });
  }

}

module.exports = MongoDBConnection;