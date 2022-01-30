const bodyParser = require("body-parser");
const despesas = require("./despesasRoute");
const receitas = require("./receitasRoute");
const resumo = require("./resumoRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), despesas, receitas, resumo);
};
