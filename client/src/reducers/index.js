import { combineReducers } from 'redux';
import armor from './armor';
import {
  buildHelmet,
  buildGauntlet,
  buildChest,
  buildLegs,
  buildClassArmor,
  buildHelmetMod,
  buildGauntletMod,
  buildChestMod,
  buildLegsMod,
  buildClassArmorMod,
  buildHelmetMiniMod,
  buildGauntletMiniMod,
  buildChestMiniMod,
  buildLegsMiniMod,
  buildClassArmorMiniMod,
} from './build';
import language from './language';
import {
  modHelmet,
  modGauntlet,
  modChest,
  modLegs,
  modClassArmor,
} from './mod';

const destinyReducer = combineReducers({
  armor,
  buildHelmet,
  buildGauntlet,
  buildChest,
  buildLegs,
  buildClassArmor,
  buildHelmetMod,
  buildGauntletMod,
  buildChestMod,
  buildLegsMod,
  buildClassArmorMod,
  buildHelmetMiniMod,
  buildGauntletMiniMod,
  buildChestMiniMod,
  buildLegsMiniMod,
  buildClassArmorMiniMod,
  language,
  modHelmet,
  modGauntlet,
  modChest,
  modLegs,
  modClassArmor,
});

export default destinyReducer;
