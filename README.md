# API REST PARA CONTROLE FINANCEIRO
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDA&color=GREEN&style=for-the-badge) ![Badge issues](https://img.shields.io/github/issues/dchueri/api-controle-financeiro?style=for-the-badge) ![Badge licensa](https://img.shields.io/github/license/dchueri/api-controle-financeiro?style=for-the-badge) ![Badge Versão](https://img.shields.io/badge/VERSION-1.0.0-blue?style=for-the-badge) 

## Índice

* [Descrição](#descrição)
* [Funcionalidades da Aplicação](#funcionalidades-da-aplicação)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Contribuidores](#contribuidores)
* [Desenvolvedor](#pessoas-desenvolvedoras)
* [Licença](#licença)

## 🚀 Descrição

Projeto desenvolvido para o Alura Challenge 2 - Back-end. A API A aplicação deve permitir que uma pessoa cadastre suas receitas e despesas do mês, bem como gerar um relatório mensal.

## 🔨 Funcionalidades da aplicação

- `Requisições`: rotas implementadas  seguindo as boas práticas do modelo REST para realizar requisições.

 -  `POST /receitas`: adiciona uma receita.
 -  `POST /despesas`: adiciona uma despesa.
 -  `GET /receitas`: retorna as receitas do usuário.
 -  `GET /despesas`: retorna as despesas do usuário.
 -  `GET /receitas/{id}`: retorna os dados de uma receita (descrição, valor e data), no formato JSON.
 -  `GET /despesas/{id}`: retorna os dados de uma despesa (descrição, valor e data), no formato JSON.
 -  `GET /receitas?descricao=xpto`: retorna todas as receitas cuja descrição contenha a palavra indicada no parâmetro descrição.
 -  `GET /despesas?descricao=xpto`: retorna todas as despesas cuja descrição contenha a palavra indicada no parâmetro descrição.
 -  `GET /receitas/{ano}/{mes}`: retorna todas as receitas do mês indicado.
 -  `GET /despesas/{ano}/{mes}`: retorna todas as despesas do mês indicado.
 -  `GET /resumo/{ano}/{mes}`: retorna um relatório do mês indicado.
 -  `PUT /receitas/{id}`: atualiza os dados de uma determinada receita.
 -  `PUT /despesas/{id}`: atualiza os dados de uma determinada despesa.
 -  `DELETE /receitas/{id}`: realiza a exclusão de uma determinada receita.
 -  `DELETE /despesas/{id}`: realiza a exclusão de uma determinada despesa.
------------
- `Banco de Dados`: Implementação de base de dados para persistência das informações.
- `Autenticação`: Serviço de autenticação/autorização para restringir acesso às informações.

## 🛠️ Construído com

* `NodeJS`
* `MySQL`
* `Express`
* `Sequelize`

## 🖇️ Contribuidores

Seja o primeiro a contribuir!

## ✒️ Autor

| [<img src="https://avatars.githubusercontent.com/u/84249430?s=400&u=b789830e57ccc23a4d4d758542785461dd656b5f&v=4" width=115><br><sub>Diego  Chueri</sub>](https://github.com/camilafernanda) | 
| :---: |

## 📄 Licença

Este projeto está sob a [MIT License](https://github.com/dchueri/api-controle-financeiro/blob/main/LICENSE).
