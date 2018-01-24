import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
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
  intlReducer,
  modHelmet,
  modGauntlet,
  modChest,
  modLegs,
  modClassArmor,
});

export default destinyReducer;
