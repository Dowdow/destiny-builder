const CLASS_TITAN = 0;
const CLASS_HUNTER = 1;
const CLASS_WARLOCK = 2;

const TYPE_HELMET = '3448274439';
const TYPE_SHOULDER = '3551918588';
const TYPE_CHEST = '14239492';
const TYPE_LEG = '20886954';
const TYPE_CLASS_ITEM = '1585787867';
const TYPE_GHOST = '4023194814';

const TIER_LEGENDARY = 5;
const TIER_EXOTIC = 6;

module.exports = {
  buildQuery: (params, dbManager) => new Promise(async (resolve, reject) => {
    try {
      const query = {};
      if (params.class && params.class !== 'all') {
        let classFilter = false;
        switch (params.class) {
          case 'titan':
            classFilter = CLASS_TITAN;
            break;
          case 'hunter':
            classFilter = CLASS_HUNTER;
            break;
          case 'warlock':
            classFilter = CLASS_WARLOCK;
            break;
          default:
        }
        if (classFilter !== undefined) {
          const classItem = await dbManager.findClassByClassId(classFilter);
          query.class = classItem._id;
        }
      }
      if (params.type && params.type !== 'all') {
        let typeFilter = false;
        switch (params.type) {
          case 'helmet':
            typeFilter = TYPE_HELMET;
            break;
          case 'shoulder':
            typeFilter = TYPE_SHOULDER;
            break;
          case 'chest':
            typeFilter = TYPE_CHEST;
            break;
          case 'legs':
            typeFilter = TYPE_LEG;
            break;
          case 'classitem':
            typeFilter = TYPE_CLASS_ITEM;
            break;
          case 'ghost':
            typeFilter = TYPE_GHOST;
            break;
          default:
        }
        if (typeFilter !== undefined) {
          const typeItem = await dbManager.findBucketByHash(typeFilter);
          query.bucket = typeItem._id;
        }
      }
      if (params.tier && params.tier !== 'all') {
        switch (params.tier) {
          case 'legendary':
            query.tier = TIER_LEGENDARY;
            break;
          case 'exotic':
            query.tier = TIER_EXOTIC;
            break;
          default:
        }
      }
      if (params.mobility !== undefined && params.mobility !== 'all') {
        query.mobility = params.mobility;
      }
      if (params.resilience !== undefined && params.resilience !== 'all') {
        query.resilience = params.resilience;
      }
      if (params.recovery !== undefined && params.recovery !== 'all') {
        query.recovery = params.recovery;
      }
      resolve(query);
    } catch (err) {
      reject(err);
    }
  }),
};
