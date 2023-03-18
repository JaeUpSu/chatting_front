const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1/",
    createProxyMiddleware({
      // target: "https://izuna.pythonanywhere.com",
      target: "http://127.0.0.1:8000",
      // target: "https://bangsam.onrender.com",
      changeOrigin: true,
      secure: false,
    })
  );
};
