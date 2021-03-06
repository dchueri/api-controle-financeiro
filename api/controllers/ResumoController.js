const DespesasServices = require("../services/DespesasServices");
const ReceitasServices = require("../services/ReceitasServices");
const Validacoes = require("../Validacoes");
const validacoes = new Validacoes("Resumo");
const despesasServices = new DespesasServices();
const receitasServices = new ReceitasServices();

class ResumoController {
  static async resumoDoMes(req, res, next) {
    const { ano, mes } = req.params;

    try {
      let somaDasDespesasDoMes =
        await despesasServices.somaTodosOsRegistrosDoMes(ano, mes);
      let somaDasReceitasDoMes =
        await receitasServices.somaTodosOsRegistrosDoMes(ano, mes);

      const registrosEncontrados = somaDasDespesasDoMes + somaDasReceitasDoMes;

      validacoes.verificaSeHouveramRegistrosNoMes(registrosEncontrados);

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
      const umaCategoria = [];

      for (let cat of categorias) {
        let somaTotalDaCategoria =
          await despesasServices.somaPelaCategoriaNoMesmoMes(cat, ano, mes);
        if (somaTotalDaCategoria <= 0) {
          somaTotalDaCategoria = 0;
        }
        umaCategoria.push(`${cat}: R$ ${somaTotalDaCategoria.toFixed(2)}`);
      }

      if (somaDasDespesasDoMes <= 0) {
        somaDasDespesasDoMes = 0;
      }
      if (somaDasReceitasDoMes <= 0) {
        somaDasReceitasDoMes = 0;
      }

      const resumo = {
        despesas: `Total de despesas no mês ${mes}/${ano}: R$ ${somaDasDespesasDoMes.toFixed(
          2
        )}`,
        receitas: `Total de receitas no mês ${mes}/${ano}: R$ ${somaDasReceitasDoMes.toFixed(
          2
        )}`,
        saldo: `Saldo do mês: R$ ${(
          somaDasReceitasDoMes - somaDasDespesasDoMes
        ).toFixed(2)}`,
        somaTotalDaCategoria: umaCategoria,
      };

      return res.status(200).json(resumo);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ResumoController;
