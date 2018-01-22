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
import mod from './mod';

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
  mod,
});

export default destinyReducer;
