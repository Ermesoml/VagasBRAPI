const axios = require('axios');
const repositorios = require('./repositorios.js')
const scheduleDatabase = require('./schedulerDAO.js')

class scheduleVagas {
  constructor() {
    this.databaseInstance = new scheduleDatabase();
  }
  async AtualizarVagasRepositorios (){
    for (let i = 0; i < repositorios.length; i++) {
      try{
        await this.databaseInstance.InserirAtualizarVagasBanco(await this.BuscarVagasURL(repositorios[i].url), repositorios[i].nome);
      }
      catch(err){
        console.error(err)
        process.exit();
      }
      
    }
    return true;
  }

  async BuscarVagasURL(url){
    if (!url) return [];

    console.log('Buscando dados da api: ' + url);

    return await axios.get(url, {auth: {username: process.env.BASIC_USER, password: process.env.BASIC_PASS}}).then(async (response) => {      
      let proximaUrl = await this.BuscarProximaURL(response.headers);
      let proximasVagas = await this.BuscarVagasURL(proximaUrl);
      return [...response.data, ...proximasVagas];
    });
  }

  async BuscarProximaURL(headers){
    let links = headers.link;
    let proximaUrl = '';
    links.replace(new RegExp("(<([^,]*))", "g"), function($0, $1, $2, $3) {
      if ($1.indexOf("next") > -1){
        $1.replace(new RegExp("(https([^>]*))", "g"), function($0, $1, $2, $3) {
          proximaUrl = $1; 
        })
      }
    })

    return proximaUrl;
  }
}

module.exports = scheduleVagas