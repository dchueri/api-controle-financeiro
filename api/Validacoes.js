const moment = require("moment");
const Sequelize = require("sequelize");
const {
  LancamentoExistente,
  NaoEncontrado,
  DadosNaoFornecidos,
  CampoInvalido,
} = require("./errors/listaDeErros");
const database = require("./models");

const Op = Sequelize.Op;

class Validacoes {
  constructor(modelo) {
    this.modelo = modelo;
  }

  defineNomeDoModelo() {
    if (this.modelo === "Despesas") {
      return "DESPESA";
    } else if (this.modelo === "Receitas") {
      return "RECEITA";
    }
  }

  verificaSeHouveramDados(dados) {
    if (Object.keys(dados).length === 0) {
      throw new DadosNaoFornecidos();
    }
  }

  verificaSeHaCampoVazio(dado) {
    if (typeof dado.descricao !== "string" || dado.descricao.length === 0) {
      throw new CampoInvalido("descrição");
    }
    if (typeof dado.valor !== "number" || dado.valor <= 0) {
      throw new CampoInvalido("valor");
    }
    if (typeof dado.data !== "string" || dado.data.length !== 10) {
      throw new CampoInvalido("data");
    }
  }

  async verificaSeExisteLancamentoIgual(where = {}, checkIfExists) {
    const result = await database[this.modelo].findOne({
      where: { ...where },
      raw: true,
    });

    if (!result && checkIfExists) {
      throw new NaoEncontrado();
    }

    return result;
  }

  async pegarPorId(id) {
    const lancamentoEncontrado = await database[this.modelo].findOne({
      where: {
        id: id,
      },
    });

    if (!lancamentoEncontrado) {
      throw new NaoEncontrado(this.defineNomeDoModelo());
    }

    return lancamentoEncontrado;
  }

  async adicionaLancamento(data) {
    return database[this.modelo].create(data);
  }

  async criarLancamento(dados) {
    const nomeDoModelo = this.defineNomeDoModelo();
    const startOfMonth = moment(dados.data)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(dados.data).endOf("month").format("YYYY-MM-DD");
    console.log(dados);
    const lancamento = await this.verificaSeExisteLancamentoIgual({
      descricao: dados.descricao,
      data: {
        [Op.gte]: startOfMonth,
        [Op.lte]: endOfMonth,
      },
    });
    if (lancamento) {
      throw new LancamentoExistente(nomeDoModelo);
    }
    return this.adicionaLancamento(dados);
  }

  async atualizaLancamento(id, dados) {
    return database[this.nomeDoModelo].update(
      dados,
      { where: { id: id } },
      transaction
    );
  }

  async alteraLancamento(dados) {
    await this.pegarPorId({ id: dados.id });
    return this.update(dados);
  }
}

module.exports = Validacoes;
