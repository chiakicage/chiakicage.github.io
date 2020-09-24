const { timeStamp } = require('console');
const { resolveNaptr } = require('dns');
var http = require('http');
var url = require('url');
let data = [{
    value: "test",
    group: 1,
    removed: true,
    id: 0
}];

let server = http.createServer(function (request, response) {
    console.log(url.parse(request.url));
    let t = url.parse(request.url);
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
    });
    if (t.pathname === '/add') {
        let s = t.query.split('&');
        console.log(s);
        data.push({
            value: (s[1].split('='))[1],
            group: 1,
            removed: false,
            id: Number((s[0].split('='))[1])
        });
        response.end('Success');
    } else if (t.pathname === '/update') {
        let s = t.query.split('&');
        let p = Number((s[0].split('='))[1]);
        data[p].value = (s[1].split('='))[1];
        data[p].group = Number((s[2].split('='))[1]);
        response.end('Success');
    } else if (t.pathname === '/remove') {
        let s = t.query.split('&');
        let p = Number((s[0].split('='))[1]);
        data[p].removed = true;
        response.end('Success');
    } else if (t.pathname === '/init') {
        console.log(2);
        let tmp = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].removed === false)
                tmp.push(data[i]);
        }
        response.end(JSON.stringify(tmp));
    } else if (t.pathname === '/init2') {
        response.end(String(data.length - 1));
    }
    console.log(data);
});

server.listen(8000);

