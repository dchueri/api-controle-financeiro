const { UsuariosServices } = require("../services");
const usuariosServices = new UsuariosServices();

const Validacoes = require("../Validacoes");
const validacoes = new Validacoes("Usuarios");

class UsuarioController {
  static async adicionaUsuario(req, res, next) {
    const dados = req.body;
    try {
      validacoes.verificaDadosDoUsuario(dados);
      const novoUsuario = await usuariosServices.adicionaUsuario(dados);
      return res.status(201).json(novoUsuario);
    } catch (error) {
      return next(error);
    }
  }

  static async listaUsuarios(req, res, next) {
    try {
      const usuariosEncontrados = await usuariosServices.listaUsuarios();
      return res.status(200).json(usuariosEncontrados);
    } catch (error) {
      return next(error);
    }
  }

  static async apagaUsuario(req, res, next) {
    const { id } = req.params;
    try {
      await usuariosServices.pegaUmRegistroPeloId(id);
      await usuariosServices.deletaRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UsuarioController;
