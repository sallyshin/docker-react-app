var mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    pqssword: 'sejung',
    database: 'myapp'
})

exports.pool = pool;