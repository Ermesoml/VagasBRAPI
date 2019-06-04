const Vaga = require('../models/Vaga');

module.exports = {
  async index(req, res){
    let pagina = req.query.pagina ? req.query.pagina : 1;
    let filtroVaga = req.query.filtroTituloVaga ? req.query.filtroTituloVaga : ' ';
    let quantidade_por_pagina = 12;

    const vagas = await Vaga.find({ $or: [{title: new RegExp(filtroVaga.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'), 'i')}, {body: new RegExp(filtroVaga.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'), 'i')}]}, {"updated_at" : 1, "title" : 1,"repo_name" : 1, "user_avatar_url": 1}).sort({created_at: -1}).limit(quantidade_por_pagina).skip(quantidade_por_pagina * (pagina - 1));
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