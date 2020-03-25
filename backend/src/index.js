const express = require('express');
const cors = require('cors');
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

app.listen(3333); // OUVIR A PORTA 3333