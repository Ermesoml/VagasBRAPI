require('dotenv').config()
const scheduleVagas = require('./schedulerVagas.js')

async function buscarVagas() {
  console.log('Agendamento de busca iniciado');

  let buscadorVagas = new scheduleVagas();
  
  let vagas = await buscadorVagas.AtualizarVagasRepositorios().then(async response => {
    process.exit();
  });
}

buscarVagas();