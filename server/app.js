const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const db = require('./db');

app.use(cors("*"));
// the __dirname is the current directory from where the script is running
const Controller = require('./controller');
app.use('/api', Controller);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app;
