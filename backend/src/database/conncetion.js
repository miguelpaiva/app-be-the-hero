// arquivo para configurar a conexao com BD

const knex = require('knex');    // importa knex
const configuration = require('../../knexfile.js'); // importa arquivo knex

const connection = knex(configuration.development); // cria conexao utilizando knex e confiuguracoes para desenvolvimento

module.exports = connection; // exporta configuracoes para a conexao

