import {
  SET_HELMET,
  SET_GAUNTLET,
  SET_CHEST,
  SET_LEGS,
  SET_CLASS_ARMOR,
  SET_HELMET_MOD,
  SET_GAUNTLET_MOD,
  SET_CHEST_MOD,
  SET_LEGS_MOD,
  SET_CLASS_ARMOR_MOD,
  SET_HELMET_MINI_MOD,
  SET_GAUNTLET_MINI_MOD,
  SET_CHEST_MINI_MOD,
  SET_LEGS_MINI_MOD,
  SET_CLASS_ARMOR_MINI_MOD,
} from '../actions/build';

const payload = {
  helmet: null,
  gauntlet: null,
  chest: null,
  legs: null,
  classArmor: null,
  helmetMod: null,
  gauntletMod: null,
  chestMod: null,
  legsMod: null,
  classArmorMod: null,
  helmetMiniMod: null,
  gauntletMiniMod: null,
  chestMiniMod: null,
  legsMiniMod: null,
  classArmorMiniMod: null,
};

export default function build(state = payload, action = {}) {
  switch (action.type) {
    case SET_HELMET:
      return Object.assign(state, { helmet: action.helmet });
    case SET_GAUNTLET:
      return Object.assign(state, { gauntlet: action.gauntlet });
    case SET_CHEST:
      return Object.assign(state, { chest: action.chest });
    case SET_LEGS:
      return Object.assign(state, { legs: action.legs });
    case SET_CLASS_ARMOR:
      return Object.assign(state, { classArmor: action.classArmor });
    case SET_HELMET_MOD:
      return Object.assign(state, { helmetMod: action.helmetMod });
    case SET_GAUNTLET_MOD:
      return Object.assign(state, { gauntletMod: action.gauntletMod });
    case SET_CHEST_MOD:
      return Object.assign(state, { chestMod: action.chestMod });
    case SET_LEGS_MOD:
      return Object.assign(state, { legsMod: action.legsMod });
    case SET_CLASS_ARMOR_MOD:
      return Object.assign(state, { classArmorMod: action.classArmorMod });
    case SET_HELMET_MINI_MOD:
      return Object.assign(state, { helmetMiniMod: action.helmetMiniMod });
    case SET_GAUNTLET_MINI_MOD:
      return Object.assign(state, { gauntletMiniMod: action.gauntletMiniMod });
    case SET_CHEST_MINI_MOD:
      return Object.assign(state, { chestMiniMod: action.chestMiniMod });
    case SET_LEGS_MINI_MOD:
      return Object.assign(state, { legsMiniMod: action.legsMiniMod });
    case SET_CLASS_ARMOR_MINI_MOD:
      return Object.assign(state, { classArmorMiniMod: action.classArmorMiniMod });
    default: return state;
  }
}
