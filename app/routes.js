const express = require('express');

const routes = new express.Router();
const VagaController = require('./controllers/VagaController.js');

routes.get('/', VagaController.index);

module.exports = routes;