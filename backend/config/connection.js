const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teamup'
});

conn.connect((err) => {
  if (err) {
    console.error('Error connecting ', err.message);
    return;
  }
  console.log('Connection successful');
});

module.exports=conn;
