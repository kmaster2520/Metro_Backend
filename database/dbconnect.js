var mysql = require('mysql');

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
        var sql = `INSERT INTO users (username, p_hash) VALUES ('${username}','${hash}');`;
        //console.log(sql);
        this.con.query(sql, function(err, rows) {
            callback(err, rows);
        });
    }


}

function sanitize(input) {
    return mysql.escape(input).slice(1,-1);
}

module.exports = {
    DBConnection, sanitize
};
