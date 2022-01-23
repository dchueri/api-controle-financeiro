const database = require("../models");
const Validacoes = require("../Validacoes");
const validacoes = new Validacoes("Receitas");

class ReceitaController {
  static async pegaTodasAsReceitas(req, res, next) {
    try {
      const todasAsReceitas = await database.Receitas.findAll();
      return res.status(200).json(validacoes.filtrar(todasAsDespesas));
    } catch (error) {
      return next(error);
    }
  }

  static async pegaUmaReceita(req, res, next) {
    const { id } = req.params;
    try {
      const umaReceita = await validacoes.pegarPorId(id);
      return res.status(200).json(umaReceita);
    } catch (error) {
      return next(error);
    }
  }

  static async criaReceita(req, res, next) {
    const dados = req.body;
    try {
      validacoes.verificaSeHaCampoVazio(dados);
      const novaReceita = await validacoes.criarLancamento(dados);
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
      await database.Receitas.update(novasInfos, { where: { id: Number(id) } });
      const receitaAtualizada = await validacoes.pegarPorId(id);
      return res.status(200).json(receitaAtualizada);
    } catch (error) {
      return next(error);
    }
  }

  static async apagaReceita(req, res, next) {
    const { id } = req.params;
    try {
      await validacoes.pegarPorId(id);
      await database.Receitas.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ReceitaController;
