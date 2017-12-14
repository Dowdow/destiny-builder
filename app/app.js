require('dotenv').config();
const express = require('express');

const app = express();
// A mettre uniquement en dev
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(express.static(`${__dirname}/../client/build`));

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
  res.sendFile('../client/index.html');
});

app.get('/armors', (req, res) => {
  dbManager.Armor.find({}, (err, armors) => {
    if (err) res.send(err);
    res.send(armors);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
