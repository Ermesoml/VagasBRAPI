const mongoose = require('mongoose');
const Vaga = require('../app/models/Vaga');

class scheduleDatabase {
  constructor() {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
  }

  async InserirAtualizarVagasBanco(vagas, repoName){
    let github_ids = [];
    for (let i = 0; i < vagas.length; i++) {
      vagas[i].status = 'ABE';
      vagas[i].updated_at = Date.now();
      vagas[i].user_login = vagas[i].user.login;
      vagas[i].user_avatar_url = vagas[i].user.avatar_url;
      vagas[i].repo_name = repoName;
      vagas[i].github_id = vagas[i].id;

      await Vaga.findOneAndUpdate({github_id: vagas[i].id}, vagas[i], {upsert:true, setDefaultsOnInsert: true}).exec();
      console.log(`Vaga salva github_id: ${vagas[i].id} Contagem: ${i+1} de ${vagas.length}`);

      github_ids.push(vagas[i].id);
    }

    console.log('Atualizando vagas fechadas')
    await Vaga.updateMany( { github_id: { $nin: github_ids}, repo_name: repoName}, { $set: { updated_at: Date.now(), status: 'BAI' } } )
    
    console.log('Vagas atualizadas no banco com sucesso')
    return;
  }
}

module.exports = scheduleDatabase;