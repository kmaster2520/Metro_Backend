var mysql = require('mysql');

/**
 * All SQL queries must be handled through this class
 * There should be no hashing, error handling, or sending responses here
 * except in constructor
 */

class DBConnection {

    constructor(dbInfo) {
        this.con = mysql.createConnection(dbInfo);
        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected to database...");
        });
    }

    getRails(callback) {
        var sql = 'SELECT * FROM rail_lines'
        this.con.query(sql, function(err, rows) {
            callback(err, rows);
        });
    }

    userAlreadyExists(username, callback) {
        var sql = `SELECT * FROM users WHERE username = '${username}'`;
        this.con.query(sql, function(err, rows) {
            callback(err, rows.length > 0); // true if user already exists
        });
    }

    registerUser(username, hash, callback) {
        var sql = `INSERT INTO users (username, p_hash) VALUES ('${username}','${hash}')`;
        this.con.query(sql, function(err, rows) {
            callback(err);
        });
    }

    loginUser(username, password, callback) {
        // we must retrieve the hash since bcrypt doesn't always generate the same hash
        var sql = `SELECT * FROM users WHERE username='${username}'`;
        this.con.query(sql, function(err, rows) {
            if (!rows || rows.length <= 0) {
                callback(err, false);
            } else {
                // hash is stored as a blob, so must extract string
                var hashCheck = Buffer.from(rows[0].p_hash).toString();
                bcrypt.compare(password, hashCheck, (err, ans) => {
                    callback(err, ans);
                });
            }
        });
    }


}

function sanitize(input) {
    return mysql.escape(input).slice(1,-1);
}

module.exports = {
    DBConnection, sanitize
};
