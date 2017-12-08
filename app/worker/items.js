const fs = require('fs');
const mongo = require('mongodb');


const CACHE_DIR = 'app/worker/cache';
const ARMOR_DIR = `${CACHE_DIR}/armor`;
const WEAPON_DIR = `${CACHE_DIR}/weapon`;
const MOD_DIR = `${CACHE_DIR}/mod`;
const STAT_DIR = `${CACHE_DIR}/stat`;

const BUNGIE_ROOT = 'https://www.bungie.net';

mongo.MongoClient.connect('mongodb://localhost/destiny', (err, db) => {
  if (err) throw err;
  db.close();
});

const stats = [];
const armors = [];

function readStatFile(file, lang) {
  fs.readFile(`${STAT_DIR}/${file}`, (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    Object.keys(json).forEach((id) => {
      const stat = json[id];
      if (stat.displayProperties.name !== undefined) {
        const existingStat = stats.find(element => element.id === id);
        if (existingStat) {
          existingStat.names[lang] = stat.displayProperties.name;
          existingStat.descriptions[lang] = stat.displayProperties.description;
        } else {
          const obj = {
            id,
            names: {
              [lang]: stat.displayProperties.name,
            },
            descriptions: {
              [lang]: stat.displayProperties.description,
            },
          };
          if (stat.displayProperties.hasIcon) {
            obj.img = `${BUNGIE_ROOT}${stat.displayProperties.icon}`;
          }
          stats.push(obj);
        }
      }
    });
  });
}

function readArmorFile(file, lang) {
  fs.readFile(`${ARMOR_DIR}/${file}`, (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    Object.keys(json).forEach((id) => {
      const armor = json[id];
      if (armor.displayProperties.name !== undefined) {
        const existingArmor = armors.find(element => element.id === id);
        if (existingArmor) {
          existingArmor.names[lang] = armor.displayProperties.name;
          existingArmor.descriptions[lang] = armor.displayProperties.description;
        } else {
          const obj = {
            id,
            names: {
              [lang]: armor.displayProperties.name,
            },
            descriptions: {
              [lang]: armor.displayProperties.description,
            },
          };
          if (armor.displayProperties.hasIcon) {
            obj.img = `${BUNGIE_ROOT}${armor.displayProperties.icon}`;
          }
          armors.push(obj);
        }
      }
    });
  });
}

module.exports = {
  saveStats: () => {
    fs.readdir(STAT_DIR, (err, files) => {
      files.forEach((file) => {
        const lang = file.split('.')[0];
        readStatFile(file, lang);
      });
    });
  },
  saveArmors: () => {
    fs.readdir(ARMOR_DIR, (err, files) => {
      files.forEach((file) => {
        const lang = file.split('.')[0];
        readArmorFile(file, lang);
      });
    });
  },
};
