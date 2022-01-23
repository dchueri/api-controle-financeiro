class CampoInvalido extends Error {
  constructor(campo) {
    const mensagem = `O campo ${campo} está inválido!`;
    super(mensagem);
    this.name = "CampoInvalido";
    this.idErro = 1;
  }
}

class DadosNaoFornecidos extends Error {
  constructor() {
    super("Não foram fornecidos dados para atualizar!");
    this.name = "DadosNaoFornecidos";
    this.idErro = 2;
  }
}

class LancamentoExistente extends Error {
  constructor(dado) {
    super(
      `Já existe o lançamento dessa ${dado} com essa descrição no mês selecionado!`
    );
    this.name = "LancamentoExistente";
    this.idErro = 3;
  }
}

class NaoEncontrado extends Error {
  constructor(dado) {
    super(`${dado} não encontrada!`);
    this.name = "NaoEncontrado";
    this.idErro = 0;
  }
}

module.exports = {
  CampoInvalido: CampoInvalido,
  DadosNaoFornecidos: DadosNaoFornecidos,
  LancamentoExistente: LancamentoExistente,
  NaoEncontrado: NaoEncontrado,
};
