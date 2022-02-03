const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();

router
  .get("/usuarios", UsuarioController.listaUsuarios)
  .post("/usuarios", UsuarioController.adicionaUsuario)
  .delete("/usuarios/:id", UsuarioController.apagaUsuario);

module.exports = router;
