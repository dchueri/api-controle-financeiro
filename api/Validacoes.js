const {
  NaoEncontrado,
  DadosNaoFornecidos,
  CampoInvalido,
  LancamentoExistente,
  SemRegistros,
} = require("./errors/listaDeErros");
const database = require("./models");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class Validacoes {
  constructor(modelo) {
    this.modelo = modelo;
    this.camposPublicos = ["id", "categoria", "descricao", "valor", "data"];
  }

  verificaSeHouveramDados(dados) {
    if (Object.keys(dados).length === 0) {
      throw new DadosNaoFornecidos();
    }
  }

  verificaSeHouveramRegistrosNoMes(registrosEncontrados) {
    if (registrosEncontrados === 0) {
      throw new SemRegistros();
    }
  }

  verificaSeHaCampoVazio(dado) {
    if (typeof dado.descricao !== "string" || dado.descricao.length === 0) {
      throw new CampoInvalido("descrição");
    }
    if (typeof dado.valor !== "number" || dado.valor <= 0) {
      console.log(dado.valor);
      throw new CampoInvalido("valor");
    }
    if (typeof dado.data !== "string" || dado.data.length !== 10) {
      throw new CampoInvalido("data");
    }
  }

  verificaDadosDoUsuario(dados) {
    if (typeof dados.nome !== "string" || dados.nome.length === 0) {
      throw new CampoInvalido("nome");
    }
    if (typeof dados.senha !== "string" || dados.senha.length === 0) {
      throw new CampoInvalido("senha");
    }
  }

  verificaSeRegistroExiste(registro, nomeDoModelo) {
    if (!registro) {
      throw new NaoEncontrado(nomeDoModelo);
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
    const objeto = Object.keys(dados);
    const novoObjeto = {};
    if (Array.isArray(dados)) {
      dados = dados.map((item) => {
        return this.filtrarObjeto(item);
      });
    } else {
      for (let i = 0; i < this.camposPublicos.length; i++) {
        novoObjeto[this.camposPublicos[i]] = dados[this.camposPublicos[i]];
      }
      return novoObjeto;
    }
    return dados;
  }
}

module.exports = Validacoes;
