const mysql = require('mysql2/promise');


const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'StoreManager',
  password: 'password',
});


module.exports = connection;
