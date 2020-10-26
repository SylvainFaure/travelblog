const mysql      = require('mysql2');

var connection;
if (process.env.NODE_ENV !== 'development') {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  connection.connect(err => {
    if (err) {
      console.log('connection error')
      console.log(err)
      return
    }
  });
} else {
  connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD
  });
}

module.exports = connection