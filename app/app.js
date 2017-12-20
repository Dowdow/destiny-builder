require('dotenv').config();
const DatabaseManager = require('./lib/DatabaseManager');
const express = require('express');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

const app = express();
// A mettre uniquement en dev
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(express.static(`${__dirname}/../client/build`));

app.get('/', (req, res) => {
  res.sendFile('../client/index.html');
});

app.get('/armors', (req, res) => {
  dbManager.Armor.find({ tier: 6 })
    .populate('class')
    .populate('bucket')
    .populate('mods')
    .exec((err, armors) => {
      if (err) res.send({});
      else res.send(armors);
    });
});

async function start() {
  try {
    await dbManager.connect();
    console.log('Connections established!');
  } catch (err) {
    console.log(`Oh no, there was an error connecting to the databases! Quick fix it: ${err}`);
  }
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

start();
