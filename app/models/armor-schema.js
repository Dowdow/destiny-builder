const mongoose = require('mongoose');

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

module.exports = mongoose.model('armor', armorSchema);
