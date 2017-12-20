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

app.get('/armors', async (req, res) => {
  const query = {};
  if (req.query.class && req.query.class !== 'all') {
    let classFilter = false;
    switch (req.query.class) {
      case 'titan':
        classFilter = 0;
        break;
      case 'hunter':
        classFilter = 1;
        break;
      case 'warlock':
        classFilter = 2;
        break;
      default:
    }
    if (classFilter !== undefined) {
      const classItem = await dbManager.findClassByClassId(classFilter);
      query.class = classItem._id;
    }
  }
  if (req.query.type && req.query.type !== 'all') {
    let typeFilter = false;
    switch (req.query.type) {
      case 'helmet':
        typeFilter = '3448274439';
        break;
      case 'shoulder':
        typeFilter = '3551918588';
        break;
      case 'chest':
        typeFilter = '14239492';
        break;
      case 'legs':
        typeFilter = '20886954';
        break;
      case 'classitem':
        typeFilter = '1585787867';
        break;
      case 'ghost':
        typeFilter = '4023194814';
        break;
      default:
    }
    if (typeFilter !== undefined) {
      const typeItem = await dbManager.findBucketByHash(typeFilter);
      query.bucket = typeItem._id;
    }
  }
  if (req.query.tier && req.query.tier !== 'all') {
    switch (req.query.tier) {
      case 'legendary':
        query.tier = 5;
        break;
      case 'exotic':
        query.tier = 6;
        break;
      default:
    }
  }
  dbManager.Armor.find(query)
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
