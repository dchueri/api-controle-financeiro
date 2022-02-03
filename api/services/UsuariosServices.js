const { LancamentoExistente } = require("../errors/listaDeErros");
const Validacoes = require("../Validacoes");
const Services = require("./Services");
const validacoes = new Validacoes('Usuarios')
const database = require("../models");


class UsuariosServices extends Services {
  constructor() {
    super("Usuarios");
  }

  async adicionaUsuario(dados) {
    const usuarioEncontrado = await validacoes.verificaSeExisteLancamentoIgual(this.nomeDoModelo, {nome: dados.nome});
    if (usuarioEncontrado){
        throw new LancamentoExistente('Usuário');
    }
    return database['Usuarios'].create(dados);
  }

  async listaUsuarios() {
    const resultado = await database[this.nomeDoModelo].findAll();
    return resultado
  }
}

module.exports = UsuariosServices;