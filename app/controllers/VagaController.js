const Vaga = require('../models/Vaga');

module.exports = {
  async index(req, res){
    let pagina = req.query.pagina ? req.query.pagina : 1;
    let filtroVaga = req.query.filtroTituloVaga ? req.query.filtroTituloVaga : ' ';
    let filtroRepositorio = req.query.filtroRepositorio && req.query.filtroRepositorio != 'Todos' ? req.query.filtroRepositorio : '';
    let quantidade_por_pagina = 12;

    // Filtro avançado, substituindo os espaços (" ") por "and" nas pesquisas. O resultado é identico à busca "like" no SQL. Dica do Frederico Macedo do grupo do Slack GOJS;
    let filtros = { $or: 
      [
        {
          $and: [
            ...filtroVaga.split(" ").map((item => {
              return {body: new RegExp (item.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'), 'i')}
            }))
          ]
        },
        {
          $and: [
            ...filtroVaga.split(" ").map((item => {
              return {title: new RegExp (item.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'), 'i')}
            })) 
          ]
        }
      ],
    };

    if (filtroRepositorio != ''){
      filtros.$and = 
      [
        {repo_name: new RegExp (filtroRepositorio.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'), 'i')}
      ]
    }

    let vagas = await Vaga.find(
        filtros, 
        {
          "created_at" : 1, 
          "title" : 1,
          "repo_name" : 1, 
          "user_avatar_url": 1
        }
    ).sort({created_at: -1}).limit(quantidade_por_pagina).skip(quantidade_por_pagina * (pagina - 1));
  
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

  async countRepos(req, res){
    try{
      const agg = [
        {$match : {status : 'ABE'}},
        {
          $group: {
            _id: "$repo_name",
            count: { $sum: 1 }
          }
        }
      ];

      const vaga = await Vaga.aggregate(agg).exec();
      return res.json(vaga);
    }
    catch(err){
      console.log(err)
      return res.json('{mensagem: Vaga mão encontrada!}')
    }
  },
}