const database = require("../models");
const Validacoes = require("../Validacoes");
const validacoes = new Validacoes("Despesas");

class DespesaController {
  static async pegaTodasAsDespesas(req, res, next) {
    try {
      const todasAsDespesas = await database.Despesas.findAll();
      return res.status(200).json(todasAsDespesas);
    } catch (error) {
      return next(error);
    }
  }

  static async pegaUmaDespesa(req, res, next) {
    const { id } = req.params;
    try {
      const umaDespesa = await validacoes.pegarPorId(id);
      return res.status(200).json(umaDespesa);
    } catch (error) {
      return next(error);
    }
  }

  static async criaDespesa(req, res, next) {
    const dados = req.body;
    try {
      validacoes.verificaSeHaCampoVazio(dados);
      const novaDespesa = await validacoes.criarLancamento(dados);
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
      validacoes.alteraLancamento();
      await database.Despesas.update(novasInfos, { where: { id: Number(id) } });
      const despesaAtualizada = await validacoes.pegarPorId(id);
      return res.status(200).json(despesaAtualizada);
    } catch (error) {
      return next(error);
    }
  }

  static async apagaDespesa(req, res, next) {
    const { id } = req.params;
    try {
      await validacoes.pegarPorId(id);
      await database.Despesas.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = DespesaController;
