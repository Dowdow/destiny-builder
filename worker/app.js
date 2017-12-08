const json = require('./json');
const items = require('./items');

if (process.argv.length > 2) {
    switch (process.argv[2]) {
        case 'json':
            return json.retrieveJsons();
        case 'items':
            return items.saveItems();
        default:
            return console.log('Unknown function')

    }
} else {
    console.log('No arguments');
}