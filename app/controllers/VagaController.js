const Vaga = require('../models/Vaga');

module.exports = {
  async index(req, res){
    const vagas = await Vaga.find({}).sort({created_at: -1});

    return res.json(vagas);
  },
}