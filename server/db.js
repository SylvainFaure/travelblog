const mysql      = require('mysql');

var connection;
if (process.env.PORT) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  connection.connect();
} else {
  connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD
  });
}

module.exports = connection