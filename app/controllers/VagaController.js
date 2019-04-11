const Vaga = require('../models/Vaga');

module.exports = {
  async index(req, res){
    const vagas = await Vaga.find({}).sort({created_at: -1});
    return res.json(vagas);
  },

  async findById(req, res){
    try{
      const vaga = await Vaga.findOne({_id: req.params.vaga_id});
      return res.json(vaga);
    }
    catch(err){
      return res.json('{mensagem: Vaga mão encontrada!}')
    }
  },
}