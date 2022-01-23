const express = require("express");
const {
  NaoEncontrado,
  CampoInvalido,
  DadosNaoFornecidos,
  LancamentoExistente,
} = require("./errors/listaDeErros");
const routes = require("./routes");

const app = express();
const port = 3000;

routes(app);

app.use((error, req, res, next) => {
  let status = 500;

  if (error instanceof NaoEncontrado) {
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
});

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
