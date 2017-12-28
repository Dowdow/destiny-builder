const CLASS_TITAN = 0;
const CLASS_HUNTER = 1;
const CLASS_WARLOCK = 2;

const TYPE_HELMET = '3448274439';
const TYPE_GAUNTLET = '3551918588';
const TYPE_CHEST = '14239492';
const TYPE_LEG = '20886954';
const TYPE_CLASS_ITEM = '1585787867';
const TYPE_GHOST = '4023194814';

const MOD_HEAD = 'enhancements.head';
const MOD_GAUNTLET = 'enhancements.arms';
const MOD_CHEST = 'enhancements.chest';
const MOD_LEG = 'enhancements.legs';
const MOD_CLASS_ITEM_TITAN = 'enhancements.class_titan';
const MOD_CLASS_ITEM_HUNTER = 'enhancements.class_hunter';
const MOD_CLASS_ITEM_WARLOCK = 'enhancements.class_warlock';
const MOD_UNIVERSAL = 'enhancements.universal';

const TIER_LEGENDARY = 5;
const TIER_EXOTIC = 6;

module.exports = {
  buildQueryArmor: (params, dbManager) => new Promise(async (resolve, reject) => {
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
          case 'gauntlet':
            typeFilter = TYPE_GAUNTLET;
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
  buildQueryMod: params => new Promise((resolve, reject) => {
    try {
      const query = {};
      if (params.type && params.type !== 'all') {
        const paramTypeArray = params.type.split(':');
        const typeArray = [];
        paramTypeArray.forEach((param) => {
          switch (param) {
            case 'helmet':
              typeArray.push(MOD_HEAD);
              break;
            case 'gauntlet':
              typeArray.push(MOD_GAUNTLET);
              break;
            case 'chest':
              typeArray.push(MOD_CHEST);
              break;
            case 'legs':
              typeArray.push(MOD_LEG);
              break;
            case 'classitem_titan':
              typeArray.push(MOD_CLASS_ITEM_TITAN);
              break;
            case 'classitem_hunter':
              typeArray.push(MOD_CLASS_ITEM_HUNTER);
              break;
            case 'classitem_warlock':
              typeArray.push(MOD_CLASS_ITEM_WARLOCK);
              break;
            case 'universal':
              typeArray.push(MOD_UNIVERSAL);
              break;
            default:
          }
        });
        query.type = { $in: typeArray };
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
      resolve(query);
    } catch (err) {
      reject(err);
    }
  }),
};
