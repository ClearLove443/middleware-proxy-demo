const express = require("express");
const compression = require('compression');
const app = express();

const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(compression());
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
    target: "http://127.0.0.1:8080",
    pathRewrite: { "^/api": "" },
    changeOrigin: true,
  })
);
app.listen(8000);
