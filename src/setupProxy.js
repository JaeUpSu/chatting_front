const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://izuna.pythonanywhere.com",
      changeOrigin: true,
      secure: false,
    })
  );
};
