const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

dbManager.connect().then(() => {
  console.log('Connections established!');
}).catch((err) => {
  console.log(`Oh no, there was an error connecting to the databases! Quick fix it: ${err}`);
});
