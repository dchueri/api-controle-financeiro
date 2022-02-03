const database = require("../models");
const moment = require("moment");
const Validacoes = require("../Validacoes");
const validacoes = new Validacoes();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

  async pegaTodosOsRegistros(where) {
    const resultado = await database[this.nomeDoModelo].findAll({
      where,
      raw: true,
    });
    const nomeDoModelo = this.defineNomeDoModelo();
    validacoes.verificaSeRegistroExiste(resultado.length, nomeDoModelo);
    return resultado;
  }

  async pegaUmRegistroPeloId(id) {
    const lancamentoEncontrado = await database[this.nomeDoModelo].findOne({
      where: {
        id: id,
      },
    });

    const nomeDoModelo = this.defineNomeDoModelo();
    validacoes.verificaSeRegistroExiste(lancamentoEncontrado, nomeDoModelo);

    return lancamentoEncontrado;
  }

  async pegaRegistrosPeloMes(ano, mes) {
    const inicioDoMes = moment(`${ano}-${mes}`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const finalDoMes = moment(`${ano}-${mes}`)
      .endOf("month")
      .format("YYYY-MM-DD");

    const resultado = await database[this.nomeDoModelo].findAll({
      where: {
        data: {
          [Op.gte]: inicioDoMes,
          [Op.lte]: finalDoMes,
        },
      },
    });
    validacoes.verificaSeHouveramRegistrosNoMes(resultado.length);
    return resultado;
  }

  async somaTodosOsRegistrosDoMes(ano, mes) {
    const inicioDoMes = moment(`${ano}-${mes}`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const finalDoMes = moment(`${ano}-${mes}`)
      .endOf("month")
      .format("YYYY-MM-DD");

    return database[this.nomeDoModelo].sum("valor", {
      where: {
        data: {
          [Op.gte]: inicioDoMes,
          [Op.lte]: finalDoMes,
        },
      },
    });
  }

  async somaPelaCategoriaNoMesmoMes(categoria, ano, mes) {
    const inicioDoMes = moment(`${ano}-${mes}`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const finalDoMes = moment(`${ano}-${mes}`)
      .endOf("month")
      .format("YYYY-MM-DD");

    return database[this.nomeDoModelo].sum("valor", {
      where: {
        categoria: categoria,
        data: {
          [Op.gte]: inicioDoMes,
          [Op.lte]: finalDoMes,
        },
      },
    });
  }

  async criaRegistro(dados) {
    await validacoes.verificaDadosRepitidos(this.nomeDoModelo, dados);
    return database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    await validacoes.verificaDadosRepitidos(
      this.nomeDoModelo,
      dadosAtualizados
    );
    return await database[this.nomeDoModelo].update(dadosAtualizados, id);
  }

  async deletaRegistro(id) {
    await database[this.nomeDoModelo].destroy({ where: { id: Number(id) } });
  }

  defineCategoria(dados) {
    const categorias = [
      "Alimentação",
      "Saúde",
      "Moradia",
      "Transporte",
      "Educação",
      "Lazer",
      "Imprevistos",
      "Outras",
    ];
    if (categorias.includes(dados.categoria) === false) {
      return (dados.categoria = "Outras");
    } else {
      for (let i = 0; i < categorias.length; i++) {
        if (dados.categoria === categorias[i]) {
          return (dados.categoria = categorias[i]);
        }
      }
    }
  }
}

module.exports = Services;
