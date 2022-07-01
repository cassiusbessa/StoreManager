const express = require('express');
const helmet = require('helmet');
const router = require('./routes/routes');
// const middlewares = require('./middlewares');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());
app.use(helmet());
app.use('/', router);

// não remova esse endpoint, é para o avaliador funcionar
// app.use(middlewares.errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;