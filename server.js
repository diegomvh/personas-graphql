var koa = require("koa");
var handlebars = require("koa-handlebars");
var Router = require("koa-router");
var graphql = require('graphql').graphql;
var QuerySchema = require('./schemas/index');

let port = process.env.PORT || 3000;
let routes = new Router();
var app = koa();

app.use(handlebars({
  defaultLayout: "base"
}));

routes.get("/api", function* () {
  var query = this.query.query;
  var params = this.query.params;

  var resp = yield graphql(QuerySchema, query, '', params);

  if (resp.errors) {
    this.status = 400;
    this.body = {
      errors: resp.errors
    };
    return;
  }

  this.body = resp;
});

routes.get("/", function* () {
  yield this.render("index", {
    title: "Test Page",
    name: "World"
  });
});

app.use(routes.middleware());

app.listen(port, () => {
  console.log("Server is up an running on port " + port);
});

module.exports = app;
