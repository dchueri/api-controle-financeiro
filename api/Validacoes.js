const {
  NaoEncontrado,
  DadosNaoFornecidos,
  CampoInvalido,
  LancamentoExistente,
} = require("./errors/listaDeErros");
const database = require("./models");
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class Validacoes {
  constructor(modelo) {
    this.modelo = modelo;
    this.camposPublicos = ["id", "descricao", "valor", "data"];
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

  async verificaSeExisteLancamentoIgual(
    nomeDoModelo,
    where = {},
    checkIfExists
  ) {
    const result = await database[nomeDoModelo].findOne({
      where: { ...where },
      raw: true,
    });

    if (!result && checkIfExists) {
      throw new NaoEncontrado();
    }

    return result;
  }

  async verificaDadosRepitidos(modelo, dados) {
    const startOfMonth = moment(dados.data)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(dados.data).endOf("month").format("YYYY-MM-DD");
    const lancamento = await this.verificaSeExisteLancamentoIgual(modelo, {
      descricao: dados.descricao,
      data: {
        [Op.gte]: startOfMonth,
        [Op.lte]: endOfMonth,
      },
    });
    if (lancamento) {
      throw new LancamentoExistente(modelo);
    }
  }

  filtrarObjeto(dados) {
    const novoObjeto = {};

    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        novoObjeto[campo] = dados[campo];
      }
    });
    return novoObjeto;
  }

  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((item) => {
        return this.filtrarObjeto(item);
      });
    } else {
      dados = this.filtrarObjeto(dados);
    }
    return dados;
  }
}

module.exports = Validacoes;
