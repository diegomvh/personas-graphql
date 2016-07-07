var koa = require("koa");
var graphql = require('graphql').graphql;
var schema = require('./schema');

let port = process.env.PORT || 3000;
var app = koa();

app.use(function* () {
  var query = this.query.query;
  var params = this.query.params;
  
  var resp = yield graphql(schema, query, '', params);

  if (resp.errors) {
    this.status = 400;
    this.body = {
      errors: resp.errors
    };
    return;
  }

  this.body = resp;
});

app.listen(port, () => {
  console.log("Server is up an running on port " + port);
});

module.exports = app;
