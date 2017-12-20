const fs = require('fs');
const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

const CACHE_DIR = 'app/worker/cache';
const CLASS_DIR = `${CACHE_DIR}/class`;

const BUNGIE_ROOT = 'https://www.bungie.net';

const classes = [];

/**
 * Read the stats files and build Stat objects
 * @param {String} file
 * @param {String} lang
 */
function readClassFile(file, lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${CLASS_DIR}/${file}`, (err, data) => {
      if (err) reject(err);
      const json = JSON.parse(data);
      Object.keys(json).forEach((id) => {
        const classObj = json[id];
        if (classObj.displayProperties.name !== '') {
          const existingClass = classes.find(element => element.hash === id);
          if (existingClass) {
            existingClass.names[lang] = classObj.displayProperties.name;
            existingClass.males[lang] = classObj.genderedClassNames.Male;
            existingClass.females[lang] = classObj.genderedClassNames.Female;
          } else {
            const obj = {
              hash: id,
              class: classObj.classType,
              names: {
                [lang]: classObj.displayProperties.name,
              },
              males: {
                [lang]: classObj.genderedClassNames.Male,
              },
              females: {
                [lang]: classObj.genderedClassNames.Female,
              },

            };
            classes.push(obj);
          }
        }
      });
      resolve();
    });
  });
}

module.exports = {
  saveClasses: () => new Promise(async (resolve, reject) => {
    try {
      await dbManager.connect();
      fs.readdir(CLASS_DIR, async (err, files) => {
        if (err) reject(err);
        else {
          await dbManager.removeAllClasses();
          const promises = [];
          files.forEach((file) => {
            const lang = file.split('.')[0];
            promises.push(readClassFile(file, lang));
          });
          await Promise.all(promises);
          await dbManager.saveClasses(classes);
          await dbManager.disconnect();
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  }),
};
