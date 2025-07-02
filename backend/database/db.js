const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Kosongkan jika pakai XAMPP default
  database: 'quiz_app'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

module.exports = db;