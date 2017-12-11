require('dotenv').config();

const mongoose = require('mongoose');

/**
 * Represents the Manager for our Databases.
 * This class exposes methods to write, delete and modify data
 * @class DatabaseManager
 */
class DatabaseManager {
  /**
   * The constructor for DatabaseManager
   * @param {Object} params - The parameters containing connection strings to the Databases
   */
  constructor({ mongoURL }) {
    this.mongoURL = mongoURL || process.env.MONGO_URL;
  }

  connectMongo() {
    return mongoose
      .connect(this.mongoURL, {
        useMongoClient: true,
      })
      .then(() => {
        console.log('Mongo connection establised.');
      });
  }

  connect() {
    return Promise.all([this.connectMongo()]);
  }
}

module.exports = DatabaseManager;
