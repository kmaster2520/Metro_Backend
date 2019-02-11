bcrypt = require('bcrypt');

// entry function to register a user
function registerUser(username, password, dbCon) {
    generateHash(username, password, dbCon);
}

// generate hash using bcrypt
function generateHash(username, password, dbCon) {
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) throw err;
        saveToDatabase(username, hash, dbCon)
    });
}

// add user to database
function saveToDatabase(username, hash, dbCon) {
    dbCon.registerUser(username, hash);
}

module.exports = {
    registerUser
}