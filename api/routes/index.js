const bodyParser = require("body-parser");
const res = require("express/lib/response");

const despesas = require("./despesasRoute");
//const niveis = require('./niveisRoute')

module.exports = (app) => {
  app.use(bodyParser.json(), despesas);
};
