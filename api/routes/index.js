const bodyParser = require("body-parser");
const despesas = require("./despesasRoute");
const receitas = require("./receitasRoute");
const resumo = require("./resumoRoute");
const erros = require("./errosRoute")
const usuarios = require('./usuariosRoute')

module.exports = (app) => {
  app
    .use(bodyParser.json(), despesas, receitas, resumo, usuarios)
    .use(erros);
};
