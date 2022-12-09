const mysql      = require('mysql2');

var connection;
if (process.env.DB === 'local') {
  connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD
  });
  connection.connect(err => {
    if (err) {
      console.log('connection error')
      console.log(err)
      return
    }
  });
} else {
  connection = mysql.createConnection({
    host     : process.env.AWS_DB_HOST,
    database : process.env.AWS_DB_NAME,
    user     : process.env.AWS_DB_USER,
    password : process.env.AWS_DB_PASSWORD
  });
  connection.connect(err => {
    if (err) {
      console.log('connection error')
      console.log(err)
      return
    }
  });
}

module.exports = connection