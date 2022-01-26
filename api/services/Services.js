const { NaoEncontrado, LancamentoExistente } = require("../errors/listaDeErros");
const database = require("../models");
const moment = require('moment')
const Validacoes = require("../Validacoes");
const validacoes = new Validacoes();

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  defineNomeDoModelo() {
    if (this.nomeDoModelo === "Despesas") {
      return "DESPESA";
    } else if (this.nomeDoModelo === "Receitas") {
      return "RECEITA";
    }
  }

  async pegaTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll({ raw: true });
  }

  async pegaUmRegistro(id) {
    const lancamentoEncontrado = await database[this.nomeDoModelo].findOne({
      where: {
        id: id,
      },
    });

    if (!lancamentoEncontrado) {
      throw new NaoEncontrado(this.defineNomeDoModelo());
    }

    return lancamentoEncontrado;
  }

  async criaRegistro(dados) {
    await validacoes.verificaDadosRepitidos(this.nomeDoModelo,dados)
    return database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    await validacoes.verificaDadosRepitidos(this.nomeDoModelo,dadosAtualizados)
    return await database[this.nomeDoModelo].update(dadosAtualizados, id);
}

  async deletaRegistro(id) {
    await database[this.nomeDoModelo].destroy({ where: { id: Number(id) } });
  }
}

module.exports = Services;
