const fs = require('fs');
const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

const CACHE_DIR = 'app/worker/cache';
const MOD_DIR = `${CACHE_DIR}/mod`;

const HASH_STAT_MOBILITY = 2996146975;
const HASH_STAT_RESILIENCE = 392767087;
const HASH_STAT_RECOVERY = 1943323491;

const BUNGIE_ROOT = 'https://www.bungie.net';

const mods = [];

/**
 * Read the mods files and build Mod objects
 * @param {String} file
 * @param {String} lang
 */
function readModFile(file, lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${MOD_DIR}/${file}`, (err, data) => {
      if (err) reject(err);
      const json = JSON.parse(data);
      Object.keys(json).forEach(async (id) => {
        const mod = json[id];
        if (mod.displayProperties.name !== '') {
          const existingMod = mods.find(element => element.hash === id);
          if (existingMod) {
            existingMod.names[lang] = mod.displayProperties.name;
            existingMod.descriptions[lang] = mod.displayProperties.description;
          } else {
            const obj = {
              hash: id,
              names: {
                [lang]: mod.displayProperties.name,
              },
              descriptions: {
                [lang]: mod.displayProperties.description,
              },
              mobility: 0,
              resilience: 0,
              recovery: 0,
            };
            if (mod.displayProperties.hasIcon) {
              obj.img = `${BUNGIE_ROOT}${mod.displayProperties.icon}`;
            }
            if (mod.plug.plugCategoryIdentifier !== undefined) {
              obj.type = mod.plug.plugCategoryIdentifier;
            }
            const promises = [];
            if (mod.investmentStats !== undefined) {
              mod.investmentStats.forEach((stat) => {
                promises.push(new Promise((elResolve) => {
                  switch (stat.statTypeHash) {
                    case HASH_STAT_MOBILITY: {
                      obj.mobility += stat.value;
                      break;
                    }
                    case HASH_STAT_RESILIENCE: {
                      obj.resilience += stat.value;
                      break;
                    }
                    case HASH_STAT_RECOVERY: {
                      obj.recovery += stat.value;
                      break;
                    }
                    default:
                      break;
                  }
                  elResolve();
                }));
              });
            }
            await Promise.all(promises);
            mods.push(obj);
          }
        }
      });
      resolve();
    });
  });
}

module.exports = {
  saveMods: () => new Promise(async (resolve, reject) => {
    try {
      await dbManager.connect();
    } catch (err) {
      reject(err);
    }
    fs.readdir(MOD_DIR, async (err, files) => {
      if (err) reject(err);
      else {
        await dbManager.removeAllMods();
        const promises = [];
        files.forEach((file) => {
          const lang = file.split('.')[0];
          promises.push(readModFile(file, lang));
        });
        Promise.all(promises).then(async () => {
          try {
            await dbManager.saveMods(mods);
            await dbManager.disconnect();
            resolve();
          } catch (pErr) {
            console.log(`An error occured while saving the mods ${pErr}`);
          }
        });
      }
    });
  }),
};
