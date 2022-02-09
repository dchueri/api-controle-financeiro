const { LancamentoExistente } = require("../errors/listaDeErros");
const Validacoes = require("../Validacoes");
const Services = require("./Services");
const validacoes = new Validacoes("Usuarios");
const database = require("../models");
const bcrypt = require("bcrypt");

class UsuariosServices extends Services {
  constructor() {
    super("Usuarios");
  }

  async gerarSenhaHash(senha) {
    const custoHash = 12;
    return await bcrypt.hash(senha, custoHash);
  }

  async adicionaUsuario(dados) {
    const usuarioEncontrado = await validacoes.verificaSeExisteLancamentoIgual(
      this.nomeDoModelo,
      { nome: dados.nome }
    );
    if (usuarioEncontrado) {
      throw new LancamentoExistente("Usuário");
    }
    const senha = dados.senha
    const senhaHash = await this.gerarSenhaHash(senha)
    dados.senha = senhaHash
    return database["Usuarios"].create(dados);
  }

  async listaUsuarios() {
    const resultado = await database[this.nomeDoModelo].findAll();
    return resultado;
  }

  async adicionaSenha(senha) {
    return await gerarSenhaHash(senha);
  }
}

module.exports = UsuariosServices;
