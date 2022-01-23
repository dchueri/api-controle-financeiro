const { Router } = require("express");
const DespesaController = require("../controllers/DespesaController");

const router = Router();

router
  .get("/despesas", DespesaController.pegaTodasAsDespesas)
  .get("/despesas/:id", DespesaController.pegaUmaDespesa)
  .post("/despesas", DespesaController.criaDespesa)
  .put("/despesas/:id", DespesaController.atualizaDespesa)
  .delete("/despesas/:id", DespesaController.apagaDespesa);

module.exports = router;
