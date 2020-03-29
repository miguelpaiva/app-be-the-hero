const express = require('express');    // importa o framework express

const OngController = require('./controllers/OngController'); // importa o arquivo para fazer as rotas da ong
const IncidentController = require('./controllers/IncidentController'); // importa o arquivo para fazer as rotas da ong
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();   // instancia e isola o modulo de rotas do express na variavel

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;



