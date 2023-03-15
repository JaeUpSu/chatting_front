const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1/",
    createProxyMiddleware({
<<<<<<< HEAD
      // target: "https://izuna.pythonanywhere.com",
      target: "http://127.0.0.1:8000",
      // target: "https://bangsam.onrender.com",
=======
      target: "https://bangsam.onrender.com",
>>>>>>> b00a47f7b69e08d01571df17aca8fdc32a438321
      changeOrigin: true,
      secure: false,
    })
  );
};
