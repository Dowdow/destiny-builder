const fs = require('fs');
const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

dbManager.connect().then(() => {
  console.log('Connections established!');
}).catch((err) => {
  console.log(`Oh no, there was an error connecting to the databases! Quick fix it: ${err}`);
});

const CACHE_DIR = 'app/worker/cache';
const ARMOR_DIR = `${CACHE_DIR}/armor`;
const WEAPON_DIR = `${CACHE_DIR}/weapon`;
const MOD_DIR = `${CACHE_DIR}/mod`;
const STAT_DIR = `${CACHE_DIR}/stat`;
const SOCKET_STAT_HASH = 4076485920;

const BUNGIE_ROOT = 'https://www.bungie.net';

const stats = [];
const mods = [];
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

function readModFile(file, lang) {
  fs.readFile(`${MOD_DIR}/${file}`, (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    Object.keys(json).forEach((id) => {
      const mod = json[id];
      if (mod.displayProperties.name !== undefined) {
        const existingMod = mods.find(element => element.id === id);
        if (existingMod) {
          existingMod.names[lang] = mod.displayProperties.name;
          existingMod.descriptions[lang] = mod.displayProperties.description;
        } else {
          const obj = {
            id,
            names: {
              [lang]: mod.displayProperties.name,
            },
            descriptions: {
              [lang]: mod.displayProperties.description,
            },
          };
          if (mod.displayProperties.hasIcon) {
            obj.img = `${BUNGIE_ROOT}${mod.displayProperties.icon}`;
          }
          if (mod.plug.plugCategoryIdentifier !== undefined) {
            obj.type = mod.plug.plugCategoryIdentifier;
          }
          mods.push(obj);
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
      if (armor.displayProperties.name !== undefined && armor.inventory.tierType > 4) {
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
          if (armor.screenshot !== undefined) {
            obj.screenshot = `${BUNGIE_ROOT}${armor.screenshot}`;
          }
          if (armor.sourceData !== undefined && armor.sourceData.sources !== undefined) {
            obj.defence = 0;
            obj.power = 0;
            armor.sourceData.sources.forEach((level) => {
              if (level.computedStats[3897883278] !== undefined) {
                if (level.computedStats[3897883278].value > obj.defence) {
                  obj.defence = level.computedStats[3897883278].value;
                }
              }
              if (level.computedStats[1935470627] !== undefined) {
                if (level.computedStats[1935470627].value > obj.power) {
                  obj.power = level.computedStats[1935470627].value;
                }
              }
            });
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
      if (err) throw err;
      files.forEach((file) => {
        const lang = file.split('.')[0];
        readStatFile(file, lang);
      });
    });
  },
  saveMods: () => {
    fs.readdir(MOD_DIR, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const lang = file.split('.')[0];
        readModFile(file, lang);
      });
    });
  },
  saveArmors: () => {
    fs.readdir(ARMOR_DIR, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const lang = file.split('.')[0];
        readArmorFile(file, lang);
      });
    });
  },
};
