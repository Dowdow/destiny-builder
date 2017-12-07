const mongo = require('mongodb');

module.exports = {
    saveItems: () => {
        mongo.MongoClient.connect('mongodb://localhost/destiny', (err, db) => {
            if (err) throw err;
        });
    }
}