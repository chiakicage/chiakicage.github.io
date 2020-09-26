const Koa = require('koa');
const router = requeire('koa-router')();

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

