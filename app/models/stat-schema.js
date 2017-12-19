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

module.exports = mongoose.model('Stat', statSchema);

