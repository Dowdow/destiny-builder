require('dotenv').config();

const mongoose = require('mongoose');
const Armor = require('../models/armor-schema');
const Mod = require('../models/mod-schema');
const Stat = require('../models/stat-schema');
const Bucket = require('../models/bucket-schema');

mongoose.Promise = global.Promise;

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

    /** Stat Model */
    this.Stat = Stat;

    /** Mod Model */
    this.Mod = Mod;

    /** Bucket Model */
    this.Bucket = Bucket;

    /** Armor Model */
    this.Armor = Armor;
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

  disconnectMongo() {
    return mongoose.disconnect().then(() => {
      console.log('Mongo disconnected.');
    });
  }

  connect() {
    return Promise.all([this.connectMongo()]);
  }

  disconnect() {
    return Promise.all([this.disconnectMongo()]);
  }

  /**
   * Save and array of Stat
   * @param {Array} stats
   */
  saveStats(stats) {
    return new Promise((resolve, reject) => {
      const promises = [];
      stats.forEach((element) => {
        promises.push(this.saveStat(element));
      });
      Promise.all(promises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  /**
   * Save a Stat object
   * @param {Stat} stat
   */
  saveStat(stat) {
    return new Promise((resolve, reject) => {
      const s = new this.Stat(stat);
      s.save((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Find one Stat by hash
   * @param {String} hash
   */
  findStatByHash(hash) {
    return new Promise((resolve, reject) => {
      this.Stat.findOne({ hash }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Remove all Stat documents
   */
  removeAllStats() {
    return new Promise((resolve, reject) => {
      this.Stat.remove({}, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  /**
   * Save an array of Mod
   * @param {Array} mods
   */
  saveMods(mods) {
    return new Promise((resolve, reject) => {
      const promises = [];
      mods.forEach((element) => {
        promises.push(this.saveMod(element));
      });
      Promise.all(promises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  /**
   * Save a Mod object
   * @param {Mod} mod
   */
  saveMod(mod) {
    return new Promise((resolve, reject) => {
      const m = new this.Mod(mod);
      m.save((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Find one Mod by hash
   * @param {String} hash
   */
  findModByHash(hash) {
    return new Promise((resolve, reject) => {
      this.Mod.findOne({ hash }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Remove all Mod documents
   */
  removeAllMods() {
    return new Promise((resolve, reject) => {
      this.Mod.remove({}, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  /**
   * Save and array of Bucket
   * @param {Array} buckets
   */
  saveBuckets(buckets) {
    return new Promise((resolve, reject) => {
      const promises = [];
      buckets.forEach((element) => {
        promises.push(this.saveBucket(element));
      });
      Promise.all(promises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  /**
   * Save a Bucket object
   * @param {Bucket} bucket
   */
  saveBucket(bucket) {
    return new Promise((resolve, reject) => {
      const b = new this.Bucket(bucket);
      b.save((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Find one Bucket by hash
   * @param {String} hash
   */
  findBucketByHash(hash) {
    return new Promise((resolve, reject) => {
      this.Bucket.findOne({ hash }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Remove all Bucket documents
   */
  removeAllBuckets() {
    return new Promise((resolve, reject) => {
      this.Bucket.remove({}, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  /**
   * Save an array of Armor
   * @param {Array} armors
   */
  saveArmors(armors) {
    return new Promise((resolve, reject) => {
      const promises = [];
      armors.forEach((element) => {
        promises.push(this.saveArmor(element));
      });
      Promise.all(promises)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  /**
   * Save a Armor object
   * @param {Armor} armor
   */
  saveArmor(armor) {
    return new Promise((resolve, reject) => {
      const a = new this.Armor(armor);
      a.save((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Find one Armor by hash
   * @param {String} hash
   */
  findArmorByHash(hash) {
    return new Promise((resolve, reject) => {
      this.Armor.findOne({ hash }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * Remove all Armor documents
   */
  removeAllArmors() {
    return new Promise((resolve, reject) => {
      this.Armor.remove({}, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = DatabaseManager;
