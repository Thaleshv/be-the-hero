const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

/*
    Métodos HTTP:
    GET: Buscar uma informação do back-end
    POST: Criar uma informação no back-end
    PUT: Alterar um Informação no back-end
    DELETE: Deletar uma informação no back-end
*/

/*
    Tipos de parâmetros:
    Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
    Route Params: Parâmetros utilizados para identificar recursos
    Request Body: Corpo da requisição utilizado para criar ou alterar recursos
*/

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    }) //VALIDAÇÕES
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object()({
        authorization: Joi.string().required(),
    }).unknown(), //VALIDAÇÕES
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required()
    }) //VALIDAÇÕES
}), IncidentController.index);


routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}) , IncidentController.delete);

module.exports = routes;