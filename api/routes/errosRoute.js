const {
  NaoEncontrado,
  CampoInvalido,
  DadosNaoFornecidos,
  LancamentoExistente,
  SemRegistros,
} = require("../errors/listaDeErros");

module.exports = (error, req, res, next) => {
  let status = 500;

  if (error instanceof NaoEncontrado || error instanceof SemRegistros) {
    status = 404;
  }
  if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
    status = 400;
  }
  if (error instanceof LancamentoExistente) {
    status = 422;
  }

  res.status(status);
  res.send(
    JSON.stringify({
      mensagem: error.message,
      id: error.idErro,
    })
  );
};
