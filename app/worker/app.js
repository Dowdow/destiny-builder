const json = require('./json');
const items = require('./items');

json.retrieveJsons()
  .then(() => {
    console.log('Json successfully retrived !');
    items.saveStats()
      .then(() => {
        console.log('Stats successfully saved !');
        items.saveMods()
          .then(() => {
            console.log('Mods successfully saved !');
            items.saveArmors()
              .then(() => {
                console.log('Amors successfully saved !');
              }).catch((err) => {
                console.log(`An error occured when trying to build armors objects.\n${err}`);
              });
            // items.saveWeapons();
          })
          .catch((err) => {
            console.log(`An error occured when trying to build mods objects.\n${err}`);
          });
      })
      .catch((err) => {
        console.log(`An error occured when trying to build stats objects.\n${err}`);
      });
  })
  .catch((err) => {
    console.log(`An error occured when trying to get jsons files.\n${err}`);
  });
