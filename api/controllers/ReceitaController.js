const { ReceitasServices } = require("../services");
const receitasServices = new ReceitasServices();

const Validacoes = require("../Validacoes");
const validacoes = new Validacoes("Receitas");

class ReceitaController {
  static async pegaTodasAsReceitas(req, res, next) {
    const { descricao } = req.query;
    const where = {};
    descricao ? (where.descricao = descricao) : null;
    try {
      const receitasEncontradas = await receitasServices.pegaTodosOsRegistros(
        where
      );
      return res.status(200).json(validacoes.filtrar(receitasEncontradas));
    } catch (error) {
      return next(error);
    }
  }

  static async pegaUmaReceita(req, res, next) {
    const { id } = req.params;
    try {
      const umaReceita = await receitasServices.pegaUmRegistroPeloId(id);
      return res.status(200).json(umaReceita);
    } catch (error) {
      return next(error);
    }
  }

  static async pegaAsReceitasPeloMes(req, res, next) {
    const { ano, mes } = req.params;

    try {
      const receitasDoMesmoMes = await receitasServices.pegaRegistrosPeloMes(
        ano,
        mes
      );
      return res.status(200).json(receitasDoMesmoMes);
    } catch (error) {
      return next(error);
    }
  }

  static async criaReceita(req, res, next) {
    const dados = req.body;
    try {
      validacoes.verificaSeHaCampoVazio(dados);
      dados.categoria = await receitasServices.defineCategoria(dados);
      const novaReceita = await receitasServices.criaRegistro(dados);
      return res.status(201).json(novaReceita);
    } catch (error) {
      return next(error);
    }
  }

  static async atualizaReceita(req, res, next) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      validacoes.verificaSeHouveramDados(novasInfos);
      await receitasServices.atualizaRegistro(novasInfos, {
        where: { id: Number(id) },
      });
      const receitaAtualizada = await receitasServices.pegaUmRegistroPeloId(id);
      return res.status(200).json(receitaAtualizada);
    } catch (error) {
      return next(error);
    }
  }

  static async apagaReceita(req, res, next) {
    const { id } = req.params;
    try {
      await receitasServices.pegaUmRegistroPeloId(id);
      await receitasServices.deletaRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ReceitaController;
