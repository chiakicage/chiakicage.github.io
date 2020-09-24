var http = require('http');
a = {
    class : 1,
    opt : 0
};
str = JSON.stringify(a);
console.log(str);
let server = http.createServer(function (request, response) {
    console.log(request);
    response.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });

    response.end(str);
});

server.listen(8000);

