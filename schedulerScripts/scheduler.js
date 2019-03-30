require('dotenv').config()
const scheduleVagas = require('./schedulerVagas.js')
const scheduleDatabase = require('./schedulerDAO.js')

async function buscarVagas() {
  console.log('Agendamento de busca iniciado');

  let buscadorVagas = new scheduleVagas();
  let databaseInstance = new scheduleDatabase();
  
  let vagas = await buscadorVagas.BuscarTodasVagasRepositorio().then(async response => {
    return response;
  });

  console.log('Gravando vagas')
  await databaseInstance.InserirAtualizarVagasBanco(vagas);

  process.exit();
}

buscarVagas();