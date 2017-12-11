const json = require('./json');
const items = require('./items');

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case 'json':
      json.retrieveJsons();
      break;
    case 'items':
      // items.saveStats();
      items.saveArmors();
      break;
    default:
      console.log('Unknown function');
  }
} else {
  console.log('No arguments');
}
