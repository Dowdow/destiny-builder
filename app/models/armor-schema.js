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
  screenshot: String,
  tier: Number,
  bucket: { type: mongoose.Schema.Types.ObjectId, ref: 'Bucket' },
  mods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mod' }],
});

module.exports = mongoose.model('Armor', armorSchema);
