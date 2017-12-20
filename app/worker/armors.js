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

let cacheClasses = [];
let cacheMods = [];
let cacheBuckets = [];

/**
 * Parse a Armor json
 * @param {Object} armor
 * @param {String} id
 * @param {String} lang
 */
function parseArmor(armor, id, lang) {
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
    if (armor.classType) {
      const classObj = cacheClasses.find(element => element.class === armor.classType);
      if (classObj !== undefined) {
        obj.class = classObj._id;
      }
    }
    if (armor.inventory.bucketTypeHash !== undefined) {
      const bucket = cacheBuckets.find(element => element.hash === `${armor.inventory.bucketTypeHash}`);
      if (bucket !== undefined) {
        obj.bucket = bucket._id;
      }
    }
    if (armor.sockets !== undefined && armor.sockets.socketEntries) {
      armor.sockets.socketEntries.forEach((socket) => {
        if (socket.socketTypeHash === HASH_FAT_SOCKET_STAT && socket.reusablePlugItems !== undefined) {
          socket.reusablePlugItems.forEach(async (modHash) => {
            const existingFatMod = cacheMods.find(element => element.hash === `${modHash.plugItemHash}`);
            if (existingFatMod) {
              obj.mobility += existingFatMod.mobility;
              obj.resilience += existingFatMod.resilience;
              obj.recovery += existingFatMod.recovery;
            }
          });
        }
        if (socket.socketTypeHash === HASH_SOCKET_STAT && socket.reusablePlugItems !== undefined) {
          socket.reusablePlugItems.forEach(async (modHash) => {
            const existingMod = cacheMods.find(element => element.hash === `${modHash.plugItemHash}`);
            if (existingMod) {
              obj.mods.push(existingMod._id);
            }
          });
        }
      });
    }
    armors.push(obj);
  }
}

/**
 * Read the armors files and build Armor objects
 * @param {String} file
 * @param {String} lang
 */
function readArmorFile(file, lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${ARMOR_DIR}/${file}`, async (err, data) => {
      if (err) reject(err);
      else {
        const json = JSON.parse(data);
        Object.keys(json).forEach((id) => {
          const armor = json[id];
          if (armor.displayProperties.name !== '' && armor.inventory.tierType > 4) {
            parseArmor(armor, id, lang);
          }
        });
        resolve();
      }
    });
  });
}

module.exports = {
  saveArmors: () => new Promise(async (resolve, reject) => {
    try {
      await dbManager.connect();
      fs.readdir(ARMOR_DIR, async (err, files) => {
        if (err) reject(err);
        else {
          await dbManager.removeAllArmors();
          cacheClasses = await dbManager.Class.find({});
          cacheMods = await dbManager.Mod.find({});
          cacheBuckets = await dbManager.Bucket.find({});
          const promises = [];
          files.forEach((file) => {
            const lang = file.split('.')[0];
            promises.push(readArmorFile(file, lang));
          });
          await Promise.all(promises);
          await dbManager.saveArmors(armors);
          await dbManager.disconnect();
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  }),
};
