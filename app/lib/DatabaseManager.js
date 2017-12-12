require('dotenv').config();

const mongoose = require('mongoose');

/** Stat Schema */
const statSchema = new mongoose.Schema({
  descriptions: {
    de: String,
    en: String,
    'es-mx': String,
    es: String,
    fr: String,
    it: String,
    ja: String,
    pl: String,
    'pt-br': String,
    ru: String,
    'zh-cht': String,
  },
  hash: String,
  img: String,
  names: {
    de: String,
    en: String,
    'es-mx': String,
    es: String,
    fr: String,
    it: String,
    ja: String,
    pl: String,
    'pt-br': String,
    ru: String,
    'zh-cht': String,
  },
});

/** Mod Schema */
const modSchema = new mongoose.Schema({
  descriptions: {
    de: String,
    en: String,
    'es-mx': String,
    es: String,
    fr: String,
    it: String,
    ja: String,
    pl: String,
    'pt-br': String,
    ru: String,
    'zh-cht': String,
  },
  hash: String,
  img: String,
  names: {
    de: String,
    en: String,
    'es-mx': String,
    es: String,
    fr: String,
    it: String,
    ja: String,
    pl: String,
    'pt-br': String,
    ru: String,
    'zh-cht': String,
  },
  type: String,
});

/** Armor Schema */
const armorSchema = new mongoose.Schema({
  defense: Number,
  descriptions: {
    de: String,
    en: String,
    'es-mx': String,
    es: String,
    fr: String,
    it: String,
    ja: String,
    pl: String,
    'pt-br': String,
    ru: String,
    'zh-cht': String,
  },
  hash: String,
  img: String,
  names: {
    de: String,
    en: String,
    'es-mx': String,
    es: String,
    fr: String,
    it: String,
    ja: String,
    pl: String,
    'pt-br': String,
    ru: String,
    'zh-cht': String,
  },
  power: Number,
  screenshot: String,
});

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
    this.Stat = mongoose.model('Stat', statSchema);

    /** Mod Model */
    this.Mod = mongoose.model('Mod', modSchema);

    /** Armor Model */
    this.Armor = mongoose.model('Armor', armorSchema);
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
        resolve(res);
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
        resolve(res);
      });
    });
  }

  /**
   * Save an array of Armor
   * @param {Array} armors
   */
  saveArmors(armors) {
    console.log(armors);
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
        resolve(res);
      });
    });
  }
}

module.exports = DatabaseManager;
