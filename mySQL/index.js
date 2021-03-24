var mysql = require('mysql');
// Initialize pool
var pool = mysql.createPool({
  connectionLimit : 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'qna',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool;