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
        this.con.query('SELECT * FROM rail_lines;', callback);
    }

    userAlreadyExists(callback) {
        
    }

    registerUser(username, hash) {
        var sql = `INSERT INTO users (username, p_hash) VALUES ('${username}','${hash}');`;
        //console.log(sql);
        this.con.query(sql, function(err, res){
            if (err) throw err;
        });
    }


}

function sanitize(input) {
    return mysql.escape(input);
}

module.exports = {
    DBConnection, sanitize
}
