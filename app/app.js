require('dotenv').config();
const DatabaseManager = require('./lib/DatabaseManager');
const helpers = require('./helpers');
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

app.get('/armors', async (req, res) => {
  try {
    const query = await helpers.buildQueryArmor(req.query, dbManager);
    dbManager.Armor.find(query)
      .populate('class')
      .populate('bucket')
      .populate('mods')
      .exec((err, armors) => {
        if (err) res.send([]);
        else res.send(armors);
      });
  } catch (err) {
    res.send([]);
  }
});

app.get('/mods', async (req, res) => {
  try {
    const query = await helpers.buildQueryMod(req.query);
    dbManager.Mod.find(query, (err, mods) => {
      if (err) res.send([]);
      else res.send(mods);
    });
  } catch (err) {
    res.send([]);
  }
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
