const bcrypt = require('bcrypt');

function generateHash(str, callback) {
  bcrypt.hash(str, 10, (err, hash) => {
    if (err) {
      console.log(err);
      callback(null);
    } else {
      callback(hash);
    }
  });
}

function verifyHash(str, hash, callback) {
  bcrypt.compare(str, hash, (err, same) => {
    if (err) {
      console.log(err);
      callback(false);
    } else if (same) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

module.exports = {
  generateHash, verifyHash
};