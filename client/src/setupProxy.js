const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      // "/api/users/login",
      // "/api/users/register",
      // "/account/password/forgot",
      // "/account/password/reset/:token",
      // "/api/blogs/createblog",
      // "/api/blogs/all",
      // "/api/blogs//blog/:id",
      // "/api/comments/createComment",
      // "/api/comments/all",
      // "/api/comments/comment/:id",
      // "/api/comments/comments/:id",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
