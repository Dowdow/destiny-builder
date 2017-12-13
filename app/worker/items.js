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
// const WEAPON_DIR = `${CACHE_DIR}/weapon`;
const MOD_DIR = `${CACHE_DIR}/mod`;
const STAT_DIR = `${CACHE_DIR}/stat`;

const HASH_SOCKET_STAT = 4076485920;
const HASH_STAT_DEFENSE = 3897883278;
const HASH_STAT_POWER = 1935470627;
const HASH_STAT_MOBILITY = 2996146975;
const HASH_STAT_RESILIENCE = 392767087;
const HASH_STAT_RECOVERY = 1943323491;

const BUNGIE_ROOT = 'https://www.bungie.net';

const stats = [];
const mods = [];
const armors = [];

/**
 * Read the stats files and build Stat objects
 * @param {String} file
 * @param {String} lang
 */
function readStatFile(file, lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${STAT_DIR}/${file}`, (err, data) => {
      if (err) reject(err);
      const json = JSON.parse(data);
      Object.keys(json).forEach((id) => {
        const stat = json[id];
        if (stat.displayProperties.name !== undefined) {
          const existingStat = stats.find(element => element.hash === id);
          if (existingStat) {
            existingStat.names[lang] = stat.displayProperties.name;
            existingStat.descriptions[lang] = stat.displayProperties.description;
          } else {
            const obj = {
              hash: id,
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
      resolve();
    });
  });
}

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
      Object.keys(json).forEach((id) => {
        const mod = json[id];
        if (mod.displayProperties.name !== undefined) {
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
      resolve();
    });
  });
}

/**
 * Read the armors files and build Armor objects
 * @param {String} file
 * @param {String} lang
 */
function readArmorFile(file, lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${ARMOR_DIR}/${file}`, (err, data) => {
      if (err) reject(err);
      const json = JSON.parse(data);
      Object.keys(json).forEach((id) => {
        const armor = json[id];
        if (armor.displayProperties.name !== undefined && armor.inventory.tierType > 4) {
          const existingArmor = armors.find(element => element.hash === id);
          if (existingArmor) {
            existingArmor.names[lang] = armor.displayProperties.name;
            existingArmor.descriptions[lang] = armor.displayProperties.description;
          } else {
            const obj = {
              hash: id,
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
              obj.defense = 0;
              obj.power = 0;
              obj.mobility = 0;
              obj.resilience = 0;
              obj.recovery = 0;
              armor.sourceData.sources.forEach((level) => {
                if (level.computedStats[HASH_STAT_DEFENSE] !== undefined) {
                  if (level.computedStats[HASH_STAT_DEFENSE].value > obj.defense) {
                    obj.defense = level.computedStats[HASH_STAT_DEFENSE].value;
                  }
                }
                if (level.computedStats[HASH_STAT_POWER] !== undefined) {
                  if (level.computedStats[HASH_STAT_POWER].value > obj.power) {
                    obj.power = level.computedStats[HASH_STAT_POWER].value;
                  }
                }
                if (level.computedStats[HASH_STAT_MOBILITY] !== undefined) {
                  if (level.computedStats[HASH_STAT_MOBILITY].value > obj.mobility) {
                    obj.mobility = level.computedStats[HASH_STAT_MOBILITY].value;
                  }
                }
                if (level.computedStats[HASH_STAT_RESILIENCE] !== undefined) {
                  if (level.computedStats[HASH_STAT_RESILIENCE].value > obj.resilience) {
                    obj.resilience = level.computedStats[HASH_STAT_RESILIENCE].value;
                  }
                }
                if (level.computedStats[HASH_STAT_RECOVERY] !== undefined) {
                  if (level.computedStats[HASH_STAT_RECOVERY].value > obj.recovery) {
                    obj.recovery = level.computedStats[HASH_STAT_RECOVERY].value;
                  }
                }
              });
            }
            if (armor.sockets !== undefined && armor.sockets.socketEntries) {
              obj.mods = [];
              armor.sockets.socketEntries.forEach((socket) => {
                if (socket.socketTypeHash === HASH_SOCKET_STAT && socket.reusablePlugItems !== undefined) {
                  socket.reusablePlugItems.forEach(async (modHash) => {
                    const mod = await dbManager.findModByHash(modHash.plugItemHash);
                    obj.mods.push(mod._id);
                  });
                }
              });
            }
            armors.push(obj);
          }
        }
      });
      resolve();
    });
  });
}

module.exports = {
  saveStats: () => new Promise((resolve, reject) => {
    fs.readdir(STAT_DIR, async (err, files) => {
      if (err) reject(err);
      else {
        await dbManager.removeAllStats();
        const promises = [];
        files.forEach((file) => {
          const lang = file.split('.')[0];
          promises.push(readStatFile(file, lang));
        });
        Promise.all(promises).then(async () => {
          try {
            await dbManager.saveStats(stats);
            resolve();
          } catch (pErr) {
            console.log(`An error occured while saving the stats ${pErr}`);
          }
        });
      }
    });
  }),
  saveMods: () => new Promise((resolve, reject) => {
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
            resolve();
          } catch (pErr) {
            console.log(`An error occured while saving the mods ${pErr}`);
          }
        });
      }
    });
  }),
  saveArmors: () => new Promise((resolve, reject) => {
    fs.readdir(ARMOR_DIR, async (err, files) => {
      if (err) reject(err);
      else {
        await dbManager.removeAllArmors();
        const promises = [];
        files.forEach((file) => {
          const lang = file.split('.')[0];
          promises.push(readArmorFile(file, lang));
        });
        Promise.all(promises).then(async () => {
          try {
            await dbManager.saveArmors(armors);
            await dbManager.disconnect();
            resolve();
          } catch (pErr) {
            console.log(`An error occured while saving the armors ${pErr}`);
          }
        });
      }
    });
  }),
};
