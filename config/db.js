const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'app_commerce'
    
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL.');
});

module.exports = db;