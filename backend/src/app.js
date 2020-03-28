const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')
const routes = require('./routes');

const app = express();

/*
    app.use(cors({
        origin: 'http://meuapp.com'  SOMENTE ESSE PODE ACESSAR
    }));
*/
app.use(cors());
app.use(express.json()); // BODY ENTENTER JSON
app.use(routes);
app.use(errors()); // RETORNA O ERRO DO JOI ESTRUTURADO

module.exports = app;