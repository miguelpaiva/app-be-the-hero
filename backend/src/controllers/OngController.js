const crypto = require('crypto');      // criptografia - usaremos para gerar uma string aleatoria
const connection = require('../database/conncetion');    // importa o arquivo contendo config de conexao com o banco

module.exports = {

    async index(request, response){                        // rota -funcao assincrona 'USANDO METODO GET', para BUSCAR dados!
        const ongs = await connection('ongs').select('*'); // seleciona todas as ongs do banco para listar 
        return response.json(ongs);                        // resposta sempre em json - backend 
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');  // funcao  para gerar ID aleatorio

        await connection('ongs').insert({                  // operacoes com o banco de dados - await espera o codigo finalizar
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })                  

        return response.json({ id });  // resposta sempre em json - backend 
    }
};