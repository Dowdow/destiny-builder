require('dotenv').config();

const express = require('express');

const app = express();

const DatabaseManager = require('./lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

dbManager.connect().then(() => {
  console.log('Connections established!');
}).catch((err) => {
  console.log(`Oh no, there was an error connecting to the databases! Quick fix it: ${err}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
