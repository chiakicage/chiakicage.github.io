const Koa = require('koa');
const router = require('koa-router')();
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const app = new Koa();

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '3anfVole',
    database: 'test'
});
connection.connect();

let root = path.resolve(process.argv[1] + '\\..');
console.log(root);

app.use(async (ctx, next) => {
    // console.log(ctx);
    ctx.set({
        'Access-Control-Allow-Origin': '*'
    });
    await next();
    console.log('done');
});

router.get('/public/:type/:name', async ctx => {
    console.log(ctx.params.name, ctx.params.name2);
    ctx.body = fs.createReadStream(path.join(root, '/' + type + '/' + name));
});

router.get('/', async ctx => {
   fs.createReadStream(path.join(root, 'index.html')).pipe(ctx.body);
});

// app.use(async (ctx, next) => {
//     // console.log(ctx);
//     await next();
// });

// router.get('/api/:name', async (ctx, next) => {
//     console.log('in');
//     console.log(ctx.params.name);
// });

app.use(router.routes());
app.listen(8001);
