const fs = require('fs');
const DatabaseManager = require('../lib/DatabaseManager');

const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

const CACHE_DIR = 'app/worker/cache';
const BUCKET_DIR = `${CACHE_DIR}/bucket`;

const buckets = [];

/**
 * Read the buckets files and build Bucket objects
 * @param {String} file
 * @param {String} lang
 */
function readBucketFile(file, lang) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${BUCKET_DIR}/${file}`, (err, data) => {
      if (err) reject(err);
      const json = JSON.parse(data);
      Object.keys(json).forEach((id) => {
        const bucket = json[id];
        if (bucket.displayProperties.name !== '') {
          const existingBucket = buckets.find(element => element.hash === id);
          if (existingBucket) {
            existingBucket.names[lang] = bucket.displayProperties.name;
            existingBucket.descriptions[lang] = bucket.displayProperties.description;
          } else {
            const obj = {
              hash: id,
              names: {
                [lang]: bucket.displayProperties.name,
              },
              descriptions: {
                [lang]: bucket.displayProperties.description,
              },
            };
            buckets.push(obj);
          }
        }
      });
      resolve();
    });
  });
}

module.exports = {
  saveBuckets: () => new Promise(async (resolve, reject) => {
    try {
      await dbManager.connect();
    } catch (err) {
      reject(err);
    }
    fs.readdir(BUCKET_DIR, async (err, files) => {
      if (err) reject(err);
      else {
        await dbManager.removeAllBuckets();
        const promises = [];
        files.forEach((file) => {
          const lang = file.split('.')[0];
          promises.push(readBucketFile(file, lang));
        });
        Promise.all(promises).then(async () => {
          try {
            await dbManager.saveBuckets(buckets);
            await dbManager.disconnect();
            resolve();
          } catch (pErr) {
            console.log(`An error occured while saving the buckets ${pErr}`);
          }
        });
      }
    });
  }),
};
