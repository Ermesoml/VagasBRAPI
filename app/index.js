require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
app.use(require('./routes.js'))

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});