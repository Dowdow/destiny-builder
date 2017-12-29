const HOSTNAME = window && window.location && window.location.hostname;

let HOST = `http://${HOSTNAME}`;

if (HOSTNAME === 'localhost') {
  HOST = `${HOST}:3000`;
}

async function callApi(route, filters) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = Object.keys(filters).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(filters[k])}`).join('&');
      const res = await fetch(`${HOST}/${route}?${query}`);
      if (res.status === 200) {
        const json = await res.json();
        resolve(json);
      } else {
        reject();
      }
    } catch (err) {
      reject(err);
    }
  });
}

function getAllArmors() {
  return callApi('armors', {});
}

function getArmorsByFilter(filters) {
  return callApi('armors', filters);
}

function getAllMods() {
  return callApi('mods', {});
}

function getModsByFilter(filters) {
  return callApi('mods', filters);
}

export { getAllArmors, getArmorsByFilter, getAllMods, getModsByFilter };
