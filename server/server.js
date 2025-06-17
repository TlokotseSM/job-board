const app = require('./app');
const http = require('http');
const { pool } = require('./config/db');

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  
  // Test DB connection
  pool.getConnection()
    .then(conn => {
      console.log('Connected to MySQL database');
      conn.release();
    })
    .catch(err => {
      console.error('Database connection failed:', err);
    });
});