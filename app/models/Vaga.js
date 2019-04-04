const mongoose = require('mongoose');

VagaSchema = new mongoose.Schema({
  github_id: Number,
  title: String,
  body: String,
  html_url: String,
  user_login: String,
  status: {
    type: String,
    default: 'ABE',
  },
  created_at: Date,
  updated_at:{
    type: Date,
    default: Date.now(),
  },
  labels: [],
  user_avatar_url: String,
  repo_name: String
})

module.exports = mongoose.model('Vaga', VagaSchema);