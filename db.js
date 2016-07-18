var Database = require('arangojs').Database;

db = new Database(process.env.ARANGO_URL);
db.useDatabase(process.env.ARANGO_DB);

module.exports = db;
