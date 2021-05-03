var mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootee',
    database: 'node_rest_api'
});

conn.connect((err) => {
    if (err) {
        throw err;
    }

    console.log(`MySQL Connected`);
});

module.exports = conn;