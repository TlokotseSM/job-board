const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'job_board'
});

connection.query('SELECT 1 + 1 AS result', (err, results) => {
  if (err) throw err;
  console.log('Database connection successful! Result:', results[0].result);
  connection.end();
});