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


}

module.exports = {
    DBConnection
}
