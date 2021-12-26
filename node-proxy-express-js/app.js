const express = require("express");

const app = express();

const { createProxyMiddleware } = require("http-proxy-middleware");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use(
  createProxyMiddleware("/api", {
    target: "http://127.0.0.1:3000",
    pathRewrite: { "^/api": "" },
    changeOrigin: true,
  })
);
app.listen(8080);
