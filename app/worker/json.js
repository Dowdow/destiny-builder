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

function createCacheDirectories() {
  return new Promise((resolve) => {
    fs.mkdir(CACHE_DIR, () => {
      fs.mkdir(ARMOR_DIR, () => {
        fs.mkdir(WEAPON_DIR, () => {
          fs.mkdir(MOD_DIR, () => {
            fs.mkdir(STAT_DIR, () => {
              resolve();
            });
          });
        });
      });
    });
  });
}

function getJson(url, file) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          fs.writeFile(file, JSON.stringify(res.data), (err) => {
            if (err) reject(err);
            console.log(`Save: ${file}`);
            resolve();
          });
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

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
  retrieveJsons: () => new Promise((resolve, reject) => {
    createCacheDirectories()
      .then(() => {
        getJson(DESTINY_PLUMBING_URL, INDEX_FILE)
          .then(() => { readIndexJson().then(() => resolve()); })
          .catch((err) => { reject(err); });
      })
      .catch((err) => {
        reject(err);
      });
  }),
};
