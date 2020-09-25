let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '3anfVole',
    database: 'test'
});

connection.connect();
console.log('done');


connection.query(
    'SELECT * FROM test',
    function (err, results) {
        if (err) throw err;
        console.log(JSON.stringify(results));
    }
);

connection.end();
