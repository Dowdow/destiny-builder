const mongoose = require('mongoose');

/** Mod Schema */
const modSchema = new mongoose.Schema({
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
  mobility: Number,
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
  recovery: Number,
  resilience: Number,
  tier: Number,
  type: String,
});

module.exports = mongoose.model('Mod', modSchema);

