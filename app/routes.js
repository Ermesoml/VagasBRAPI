const express = require('express');

const routes = new express.Router();
const VagaController = require('./controllers/VagaController.js');

routes.get('/', (req, res) => {
  res.json({'API': 'Api para vagas no Brasil'})
});

routes.get('/vagas', VagaController.index);
routes.get('/vaga/:vaga_id', VagaController.findById);
routes.get('/repositorios', VagaController.countRepos);

module.exports = routes;