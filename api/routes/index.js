const {
  NaoEncontrado,
  CampoInvalido,
  DadosNaoFornecidos,
  LancamentoExistente,
  SemRegistros,
} = require("../errors/listaDeErros");
const bodyParser = require("body-parser");
const despesas = require("./despesasRoute");
const receitas = require("./receitasRoute");
const resumo = require("./resumoRoute");
const erros = require("./errosRoute")

module.exports = (app) => {
  app
    .use(bodyParser.json(), despesas, receitas, resumo)
    .use(erros);
};
