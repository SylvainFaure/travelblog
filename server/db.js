const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  database : 'blog',
  user     : 'root',
  password : ''
});

module.exports = connection