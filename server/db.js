const mysql = require('mysql2');

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',      
  user: 'root',           
  password: 'root',       
  database: 'katalog_pakaian', 
});

// Memeriksa koneksi
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db;




