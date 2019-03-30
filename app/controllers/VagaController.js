const Vaga = require('../models/Vaga');

module.exports = {
  async index(req, res){
    const vagas = await Vaga.find({});

    return res.json(vagas);
  },
}