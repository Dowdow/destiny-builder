const mongoose = require('mongoose');

/** Mod Bucket */
const bucketSchema = new mongoose.Schema({
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

module.exports = mongoose.model('bucket', bucketSchema);

