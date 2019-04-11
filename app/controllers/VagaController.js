const Vaga = require('../models/Vaga');

module.exports = {
  async index(req, res){
    const vagas = await Vaga.find({}).sort({created_at: -1});
    return res.json(vagas);
  },

  async findById(req, res){
    const vaga = await Vaga.findOne({_id: req.query.vaga_id});
    return res.json(vaga);
  },
}