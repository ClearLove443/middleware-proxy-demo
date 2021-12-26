const Koa = require("koa");

const app = new Koa();

const proxy = require("koa-server-http-proxy");

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(
  proxy("/api", {
    target: "http://127.0.0.1:3000",
    pathRewrite: { "^/api": "" },
    changeOrigin: true,
  })
);

app.listen(8080);
