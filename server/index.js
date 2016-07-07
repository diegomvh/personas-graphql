var koa = require("koa");

let port = process.env.PORT || 3000;
var app = koa();

app.listen(port, () => {
  console.log("Server is up an running on port " + port);
});

module.exports = app;
