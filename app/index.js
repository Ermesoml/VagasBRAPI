require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

// app.use(express.json);
app.use(require('./routes.js'))

app.listen(3000, () => {
  console.log('Server started on port 3000')
});