const { timeStamp } = require('console');
const { resolveNaptr } = require('dns');
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mysql = require('mysql');

let data = [{
    value: "test",
    group: 1,
    removed: true,
    id: 0
}];

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '3anfVole',
    database: 'test'
});

connection.connect();

let root = path.resolve(process.argv[1] + '\\..\\..');
console.log(root);

let server = http.createServer(function (request, response) {
    console.log(url.parse(request.url));
    let ur = url.parse(request.url);
    let ph = ur.pathname;
    let rq = ph.split('/');
    console.log(rq);
    if (rq[1] === 'api') {
        
        if (rq[2] === 'add') {
            let s = ur.query;
            console.log(s);
            connection.query(
                'INSERT INTO test (`value`, `group`) VALUES (?, ?)',
                [String((s.split('='))[1]), 1],
                function (err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        response.writeHead(404);
                        response.end('Failed.');
                    } else {
                        // console.log('INSERT ID:', result);
                        response.writeHead(200, {
                            'Access-Control-Allow-Origin': '*',
                        });
                        response.end(String(result.insertId));
                    }
                }
            );
            // data.push({
            //     value: (s[1].split('='))[1],
            //     group: 1,
            //     removed: false,
            //     id: Number((s[0].split('='))[1])
            // });
            // response.end('Success');
        } else if (rq[2] === 'update') {
            let s = ur.query.split('&');
            let p = (s[0].split('='))[1];
            let v = (s[1].split('='))[1];
            let g = (s[2].split('='))[1];
            connection.query(
                'UPDATE test SET `value` = ?, `group` = ? WHERE id = ?',
                [v, g, p],
                function (err, result) {
                    if (err) {
                        console.log('[UPDATE ERROR] - ', err.message);
                        response.writeHead(404);
                        response.end('Failed.');
                    } else {
                        // console.log('INSERT ID:', result);
                        response.writeHead(200, {
                            'Access-Control-Allow-Origin': '*',
                        });
                        response.end('Success');
                    }
                }
            );
        } else if (rq[2] === 'remove') {
            let s = ur.query.split('&');
            let p = (s[0].split('='))[1];
            // data[p].removed = true;
            connection.query(
                'DELETE FROM test WHERE id = ?',
                [p],
                function (err, result) {
                    if (err) {
                        console.log('[DELETE ERROR] - ', err.message);
                        response.writeHead(404);
                        response.end('Failed.');
                    } else {
                        // console.log('INSERT ID:', result);
                        response.writeHead(200, {
                            'Access-Control-Allow-Origin': '*',
                        });
                        response.end('Success');
                    }
                }
            );
        } else if (rq[2] === 'init') {
            connection.query(
                'SELECT * FROM test',
                function (err, result) {
                    if (err) {
                        console.log('[INIT ERROR] - ', err.message);
                        response.writeHead(404);
                        response.end('Failed.');
                    } else {
                        // console.log('INSERT ID:', result);
                        response.writeHead(200, {
                            'Access-Control-Allow-Origin': '*',
                        });
                        response.end(JSON.stringify(result));
                    }
                }
            );
        }
        // console.log(data);
    } else {
        let filepath = ph === '/' ? path.join(root, 'index.html') : path.join(root, ph);
        fs.stat(filepath, function (err, stats) {
            if (!err && stats.isFile()) {
                response.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                });
                fs.createReadStream(filepath).pipe(response);
            } else {
                response.writeHead(404);
                response.end('404 not found.');
            }
        });
    }


});

server.listen(8000);

