const { Router } = require("express");
const ReceitaController = require("../controllers/ReceitaController");

const router = Router();

router
  .get("/receitas", ReceitaController.pegaTodasAsReceitas)
  .get("/receitas/:id", ReceitaController.pegaUmaReceita)
  .post("/receitas", ReceitaController.criaReceita)
  .put("/receitas/:id", ReceitaController.atualizaReceita)
  .delete("/receitas/:id", ReceitaController.apagaReceita);

module.exports = router;
