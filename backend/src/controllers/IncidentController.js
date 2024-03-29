const connection = require('../database/conncetion');  

module.exports = {
    async index(request, response) {      // rota -funcao assincrona 'USANDO METODO GET', para BUSCAR dados!
        const { page = 1 } = request.query;  // esquema para listar por pagina, ex, 5 de cada vez 

        const [count] = await connection('incidents').count();
        console.log(count);
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') 
        .limit(5)                // limita a busca ate 5 casos, para a paginacao
        .offset((page - 1) * 5)  // pular a partir da pagina 1, a cada 5
        .select([                // seleciona os casos que estamo no banco para listar, e quais dados da outra tabela eu quero
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf']);       

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })        

        return response.json({ id });
    },

    async delete(request, response) {
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
                               .where('id', id)
                               .select('ong_id')
                               .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not allowed."  });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};