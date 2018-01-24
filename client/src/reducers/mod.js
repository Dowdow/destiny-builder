import {
  SET_MODS_HELMET,
  SET_MODS_GAUNTLET,
  SET_MODS_CHEST,
  SET_MODS_LEGS,
  SET_MODS_CLASS_ARMOR,
} from '../actions/mod';

export function modHelmet(state = [], action = {}) {
  switch (action.type) {
    case SET_MODS_HELMET:
      return action.mods;
    default: return state;
  }
}

export function modGauntlet(state = [], action = {}) {
  switch (action.type) {
    case SET_MODS_GAUNTLET:
      return action.mods;
    default: return state;
  }
}

export function modChest(state = [], action = {}) {
  switch (action.type) {
    case SET_MODS_CHEST:
      return action.mods;
    default: return state;
  }
}

export function modLegs(state = [], action = {}) {
  switch (action.type) {
    case SET_MODS_LEGS:
      return action.mods;
    default: return state;
  }
}

export function modClassArmor(state = [], action = {}) {
  switch (action.type) {
    case SET_MODS_CLASS_ARMOR:
      return action.mods;
    default: return state;
  }
}
