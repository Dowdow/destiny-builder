const axios = require('axios');
const fs = require('fs');

const DESTINY_PLUMBING_URL = 'https://destiny.plumbing/index.json';

const CACHE_DIR = 'app/worker/cache';
const ARMOR_DIR = `${CACHE_DIR}/armor`;
const WEAPON_DIR = `${CACHE_DIR}/weapon`;
const MOD_DIR = `${CACHE_DIR}/mod`;
const STAT_DIR = `${CACHE_DIR}/stat`;
const INDEX_FILE = `${CACHE_DIR}/index.json`;

const LANG_SUPPORTED = ['en', 'fr', 'es', 'de', 'it', 'ja', 'pt-br', 'es-mx', 'ru', 'pl', 'zh-cht'];

/**
 * Create a directory
 * @param {String} dir
 */
function makeDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Create all cache directories
 */
async function createCacheDirectories() {
  try {
    await makeDirectory(CACHE_DIR);
    await makeDirectory(STAT_DIR);
    await makeDirectory(MOD_DIR);
    await makeDirectory(ARMOR_DIR);
    await makeDirectory(WEAPON_DIR);
  } catch (err) {
    console.log('Cache directories cannot be created or already exists.');
  }
}

/**
 * Get the id of the index file
 */
function getIndexId() {
  return new Promise((resolve, reject) => {
    fs.readFile(INDEX_FILE, (err, data) => {
      if (err || data === undefined) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json.id);
      }
    });
  });
}

/**
 * Retrieve and save a json file in the cache directory
 * @param {String} url
 * @param {String} file
 */
function getJson(url, file) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        fs.writeFile(file, JSON.stringify(res.data), (err) => {
          if (err) reject(err);
          console.log(`Save: ${file}`);
          resolve();
        });
      } else {
        reject();
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Exploit the index file
 */
function readIndexJson() {
  return new Promise((resolve, reject) => {
    fs.readFile(INDEX_FILE, (err, data) => {
      if (err) reject(err);
      const json = JSON.parse(data);
      const promises = [];
      Object.keys(json).forEach((lang) => {
        if (LANG_SUPPORTED.includes(lang)) {
          promises.push(getJson(json[lang].raw.DestinyStatDefinition, `${STAT_DIR}/${lang}.json`));
          promises.push(getJson(json[lang].items.Armor, `${ARMOR_DIR}/${lang}.json`));
          promises.push(getJson(json[lang].items.Weapon, `${WEAPON_DIR}/${lang}.json`));
          promises.push(getJson(json[lang].items.Mod, `${MOD_DIR}/${lang}.json`));
        }
      });
      Promise.all(promises).then(() => {
        resolve();
      });
    });
  });
}

module.exports = {
  retrieveJsons: () => new Promise(async (resolve, reject) => {
    let oldId = 0;
    try {
      oldId = await getIndexId();
    } catch (err) { console.log('No previous index file.'); }
    await createCacheDirectories();
    await getJson(DESTINY_PLUMBING_URL, INDEX_FILE);
    const newId = await getIndexId();
    if (oldId === newId) {
      reject(new Error('Already up to date !'));
    } else {
      await readIndexJson();
      resolve();
    }
  }),
};
