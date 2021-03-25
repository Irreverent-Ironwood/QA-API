var mysql = require('mysql');
// Initialize pool
var pool = mysql.createPool({
  connectionLimit : 10,
  host: '3.12.155.160',
  port: 3306,
  user: 'michael',
  password: 'password',
  database: 'qna',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool;