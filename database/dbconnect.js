var mysql = require('mysql');

/**
 * All SQL queries must be handled through this class
 */

class DBConnection {

  constructor(dbInfo) {
    this.con = mysql.createConnection(dbInfo);
    this.con.connect(function (err) {
      if (err) throw err;
      console.log("Connected to database...");
    });
  }

  getRails(callback) {
    var sql = 'SELECT * FROM rail_lines'
    this.con.query(sql, (err, rows) => {
      callback(err, rows);
    });
  }

  userExistsWithPassword(username, password, callback) {
    var sql = `SELECT * FROM users WHERE username = '${username}'`;
    this.con.query(sql, (err, rows) => {
      if (err) {
        callback(err, false); // error
      } else if (!rows || rows.length <= 0) {
        callback(err, false); // no user exists
      } else {
        // hash is stored as a blob, so must extract string
        var hashCheck = Buffer.from(rows[0].p_hash).toString();
        bcrypt.compare(password, hashCheck, (err, ans) => {
          callback(err, ans);
        });
      }
    });
  }

  registerUser(username, hash, callback) {
    var sql = `INSERT INTO users (username, p_hash) VALUES ('${username}','${hash}')`;
    this.con.query(sql, (err, _) => {
      callback(err);
    });
  }

  deleteUser(username, password, callback) {
    this.userExistsWithPassword(username, password, (err, ans) => {
      if (err) {
        callback(err, false);
      } else {
        var sql = `DELETE FROM users WHERE username='${username}'`;
        this.con.query(sql, (err, rows) => {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });

  }

  loginUser(username, password, callback) {
    this.userExistsWithPassword(username, password, (err, ans) => {
      callback(err, ans);
      // do other stuff
    });
  }


}

/*function sanitize(input) {
  return mysql.escape(input).slice(1, -1);
}*/

module.exports = DBConnection;
