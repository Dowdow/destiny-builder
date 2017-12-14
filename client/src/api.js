const host = 'http://localhost:3000';

async function getAllArmors() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${host}/armors`);
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

export { getAllArmors };
