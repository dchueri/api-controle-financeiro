const bodyParser = require("body-parser");
const res = require("express/lib/response");

const despesas = require("./despesasRoute");
const receitas = require("./receitasRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), despesas, receitas);
};
