const express = require('express'); // instancia o framework express
const cors = require('cors');       // instancia o framework express
const routes = require('./routes'); // instancia as rotas do arquivo na variavel

const app = express();   // instancia e cria a aplicacao

/*
app.use(cors({
    origin: "https://www.bethehero.com.br"
}));  
*/
app.use(cors());
app.use(express.json()); // dizer ao express q vamos usar JSON para as requisicoes
app.use(routes);       // chama as rotas que foram feitas no outro arquivo  

app.listen(3333);   // define uma porta para a rota do app (localhost:3333 no chrome)



/* COMMENTS DA AULA

    Criar uma rota para o navegador achar o app 
    Param 1 ('/') => pasta raiz
    Param 2 (funcao requisicao e resposta) =>  (localhost:3333/users) —> [ 3333 ⇒ rota ] e  [ /users ⇒ recursos ]
*/

/*
    Metodos HTTP
    GET => Buscar/listar uma informacao do back-end
    POST => Criar uma informacao no back-end
    PUT => Alterar uma informacao no back-end 
    DELETE => Deletar uma informacao no back-end

*/

/*
     Tipos de Parametros

     Query Params: Parametros nomeados enviados na rota apos '?'  (Filtros, paginacao, contagem) 
        ->  app.get('/users', (request, response) => { 
                const params = request.query;
                console.log(params);
            });

        -> http://localhost:3333/users?name=Miguel

     Route Params: Parametros utilizados para identificar recursos '/' 
        ->  app.get('/users/:id', (request, response) => { 
                const params = request.params;
                console.log(params);
            }); 
        -> http://localhost:3333/users/1

    Request Body: Corpo da requisicao utilizado para criar ou alterar recursos
        ->  app.post('/users', (request, response) => { 
                const body = request.body;
                console.log(body);
            }); 
        -> http://localhost:3333/users
*/

/*
     Tipos de Bancos de Dados

     SQL: MySQL, -> SQLite <- , PostgreSQL, Oracle, Microsoft SQL Server

     NoSQL: MongoDB, CouchDB, etc..   

*/

/*
    Configurando BD

    Driver: SELECT * FROM users
    Query Bulder: table('users').select('*').where();

*/
