const json = require('./json');
const stats = require('./stats');
const classes = require('./classes');
const mods = require('./mods');
const buckets = require('./buckets');
const armors = require('./armors');

async function main() {
  try {
    await json.retrieveJsons();
    console.log('Json successfully retrived !');
  } catch (err) {
    console.log(`An error occured when trying to get jsons files.\n${err}`);
  }
  try {
    await stats.saveStats();
    console.log('Stats successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build stats objects.\n${err}`);
  }
  try {
    await classes.saveClasses();
    console.log('Classes successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build classes objects.\n${err}`);
  }
  try {
    await mods.saveMods();
    console.log('Mods successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build mods objects.\n${err}`);
  }
  try {
    await buckets.saveBuckets();
    console.log('Buckets successfully saved !');
  } catch (err) {
    console.log(`An error occured when trying to build buckets objects.\n${err}`);
  }
  try {
    await armors.saveArmors();
    console.log('Amors successfully saved !');
    // await items.saveWeapons();
  } catch (err) {
    console.log(`An error occured when trying to build armors objects.\n${err}`);
  }
}

main();
