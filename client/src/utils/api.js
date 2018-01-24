export const HOSTNAME = window && window.location && window.location.hostname;

let HOST = `http://${HOSTNAME}`;

if (HOSTNAME === 'localhost') {
  HOST = `${HOST}:3000`;
}

export async function callApi(route, filters) {
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
