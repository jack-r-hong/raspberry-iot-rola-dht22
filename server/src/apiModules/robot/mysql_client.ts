const mysql = require('mysql');
export const connection = mysql.createConnection({
  host: '192.168.1.102',
  user: 'root',
  password: 'GFwV3cdgkHd9eGXA',
  database: 'auth',
});

// connection.connect();

// connection.end();
