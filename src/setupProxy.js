const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://bangsam.onrender.com",
      // target: "http://127.0.0.1:8000",
      changeOrigin: true,
      secure: false,
    })
  );
};
