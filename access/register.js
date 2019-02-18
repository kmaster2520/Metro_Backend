bcrypt = require('bcrypt');

// entry function to register a user
function registerUser(username, password, dbCon, callback) {
    generateHash(username, password, dbCon, callback);
}

// generate hash using bcrypt
function generateHash(username, password, dbCon, callback) {
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) throw err;
        saveToDatabase(username, hash, dbCon, callback)
    });
}

// add user to database
function saveToDatabase(username, hash, dbCon, callback) {
    dbCon.registerUser(username, hash, callback);
}

module.exports = {
    registerUser
};