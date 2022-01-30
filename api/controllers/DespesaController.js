const Validacoes = require("../Validacoes");
const validacoes = new Validacoes("Despesas");

const { DespesasServices } = require("../services");
const despesasServices = new DespesasServices();

class DespesaController {
  static async pegaTodasAsDespesas(req, res, next) {
    const { descricao } = req.query;
    const where = {};
    descricao ? (where.descricao = descricao) : null;
    try {
      const despesasEncontradas = await despesasServices.pegaTodosOsRegistros(
        where
      );
      return res.status(200).json(validacoes.filtrar(despesasEncontradas));
    } catch (error) {
      return next(error);
    }
  }

  static async pegaUmaDespesa(req, res, next) {
    const { id } = req.params;
    try {
      const umaDespesa = await despesasServices.pegaUmRegistroPeloId(id);
      return res.status(200).json(umaDespesa);
    } catch (error) {
      return next(error);
    }
  }

  static async pegaAsDespesasPeloMes(req, res, next) {
    const { ano, mes } = req.params;

    try {
      const despesasDoMesmoMes = await despesasServices.pegaRegistrosPeloMes(
        ano,
        mes
      );
      return res.status(200).json(despesasDoMesmoMes);
    } catch (error) {
      return next(error);
    }
  }

  static async criaDespesa(req, res, next) {
    const dados = req.body;
    try {
      validacoes.verificaSeHaCampoVazio(dados);
      dados.categoria = await despesasServices.defineCategoria(dados);
      const novaDespesa = await despesasServices.criaRegistro(dados);
      return res.status(201).json(novaDespesa);
    } catch (error) {
      return next(error);
    }
  }

  static async atualizaDespesa(req, res, next) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      validacoes.verificaSeHouveramDados(novasInfos);
      await despesasServices.atualizaRegistro(novasInfos, {
        where: { id: Number(id) },
      });
      const despesaAtualizada = await despesasServices.pegaUmRegistroPeloId(id);
      return res.status(200).json(despesaAtualizada);
    } catch (error) {
      return next(error);
    }
  }

  static async apagaDespesa(req, res, next) {
    const { id } = req.params;
    try {
      await despesasServices.pegaUmRegistroPeloId(id);
      await despesasServices.deletaRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = DespesaController;
