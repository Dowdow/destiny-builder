const fs = require('fs');
const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

const CACHE_DIR = 'app/worker/cache';
const STAT_DIR = `${CACHE_DIR}/stat`;

const BUNGIE_ROOT = 'https://www.bungie.net';

const stats = [];

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
        if (stat.displayProperties.name !== '') {
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

module.exports = {
  saveStats: () => new Promise(async (resolve, reject) => {
    try {
      await dbManager.connect();
      fs.readdir(STAT_DIR, async (err, files) => {
        if (err) reject(err);
        else {
          await dbManager.removeAllStats();
          const promises = [];
          files.forEach((file) => {
            const lang = file.split('.')[0];
            promises.push(readStatFile(file, lang));
          });
          await Promise.all(promises);
          await dbManager.saveStats(stats);
          await dbManager.disconnect();
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  }),
};
