const json = require('./json');
const items = require('./items');

async function main() {
  try {
    await json.retrieveJsons();
    console.log('Json successfully retrived !');
  } catch (err) {
    console.log(`An error occured when trying to get jsons files.\n${err}`);
  }
  try {
    await items.saveStats();
    console.log('Stats successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build stats objects.\n${err}`);
  }
  try {
    await items.saveMods();
    console.log('Mods successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build mods objects.\n${err}`);
  }
  try {
    await items.saveBuckets();
    console.log('Buckets successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build buckets objects.\n${err}`);
  }
  try {
    await items.saveArmors();
    console.log('Amors successfully saved !');
    // await items.saveWeapons();
  } catch (err) {
    console.log(`An error occured when trying to build armors objects.\n${err}`);
  }
}

main();
