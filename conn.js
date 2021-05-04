var mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBNAME
});

conn.connect((err) => {
    if (err) {
        throw err;
    }

    console.log(`MySQL Connected`);
});

module.exports = conn;