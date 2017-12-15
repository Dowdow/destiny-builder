const fs = require('fs');
const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

const CACHE_DIR = 'app/worker/cache';
const ARMOR_DIR = `${CACHE_DIR}/armor`;

const HASH_SOCKET_STAT = 4076485920;
const HASH_FAT_SOCKET_STAT = 3497077129;
const HASH_STAT_DEFENSE = 3897883278;
const HASH_STAT_POWER = 1935470627;
const HASH_STAT_MOBILITY = 2996146975;
const HASH_STAT_RESILIENCE = 392767087;
const HASH_STAT_RECOVERY = 1943323491;

const BUNGIE_ROOT = 'https://www.bungie.net';

const armors = [];

const cacheBuckets = [];
const cacheFatMods = [];
const cacheMods = [];

/**
 * Parse a Armor json
 * @param {Object} armor
 * @param {String} id
 * @param {String} lang
 */
function parseArmor(armor, id, lang) {
  return new Promise(async (resolve, reject) => {
    const existingArmor = armors.find(element => element.hash === id);
    if (existingArmor) {
      existingArmor.names[lang] = armor.displayProperties.name;
      existingArmor.descriptions[lang] = armor.displayProperties.description;
      resolve();
    } else {
      const obj = {
        hash: id,
        names: {
          [lang]: armor.displayProperties.name,
        },
        descriptions: {
          [lang]: armor.displayProperties.description,
        },
        img: armor.displayProperties.hasIcon ? `${BUNGIE_ROOT}${armor.displayProperties.icon}` : '',
        screenshot: armor.screenshot !== undefined ? `${BUNGIE_ROOT}${armor.screenshot}` : '',
        tier: armor.inventory.tierType,
        defense: 0,
        power: 0,
        mobility: 0,
        resilience: 0,
        recovery: 0,
        mods: [],
      };
      if (armor.sourceData !== undefined && armor.sourceData.sources !== undefined) {
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
      if (armor.inventory.bucketTypeHash !== undefined) {
        const existingBucket = cacheBuckets.find(element => element.hash === armor.inventory.bucketTypeHash);
        if (existingBucket) {
          obj.bucket = existingBucket._id;
        } else {
          try {
            const bucket = await dbManager.findBucketByHash(armor.inventory.bucketTypeHash);
            cacheBuckets.push({
              hash: bucket.hash,
              _id: bucket._id,
            });
            obj.bucket = bucket._id;
          } catch (bucketErr) {
            reject(bucketErr);
          }
        }
      }
      if (armor.sockets !== undefined && armor.sockets.socketEntries) {
        armor.sockets.socketEntries.forEach((socket) => {
          if (socket.socketTypeHash === HASH_FAT_SOCKET_STAT && socket.reusablePlugItems !== undefined) {
            socket.reusablePlugItems.forEach(async (modHash) => {
              const existingFatMod = cacheFatMods.find(element => element.hash === modHash.plugItemHash);
              if (existingFatMod) {
                obj.mobility += existingFatMod.mobility;
                obj.resilience += existingFatMod.resilience;
                obj.recovery += existingFatMod.recovery;
              } else {
                try {
                  const fatMod = await dbManager.findModByHash(modHash.plugItemHash);
                  cacheFatMods.push({
                    hash: fatMod.hash,
                    mobility: fatMod.mobility,
                    resilience: fatMod.resilience,
                    recovery: fatMod.recovery,
                  });
                  obj.mobility += fatMod.mobility;
                  obj.resilience += fatMod.resilience;
                  obj.recovery += fatMod.recovery;
                } catch (fatModErr) {
                  reject(fatModErr);
                }
              }
            });
          }
          if (socket.socketTypeHash === HASH_SOCKET_STAT && socket.reusablePlugItems !== undefined) {
            socket.reusablePlugItems.forEach(async (modHash) => {
              const existingMod = cacheMods.find(element => element.hash === modHash.plugItemHash);
              if (existingMod) {
                obj.mods.push(existingMod._id);
              } else {
                try {
                  const mod = await dbManager.findModByHash(modHash.plugItemHash);
                  cacheMods.push({
                    hash: mod.hash,
                    _id: mod._id,
                  });
                  obj.mods.push(mod._id);
                } catch (modErr) {
                  reject(modErr);
                }
              }
            });
          }
        });
      }
      armors.push(obj);
      resolve();
    }
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
      const promises = [];
      Object.keys(json).forEach((id) => {
        const armor = json[id];
        if (armor.displayProperties.name !== '' && armor.inventory.tierType > 4) {
          promises.push(parseArmor(armor, id, lang));
        }
      });
      Promise.all(promises)
        .then(() => resolve())
        .catch(pErr => reject(pErr));
    });
  });
}

module.exports = {
  saveArmors: () => new Promise(async (resolve, reject) => {
    try {
      await dbManager.connect();
    } catch (err) {
      reject(err);
    }
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
