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

export function buildHelmet(state = null, action = {}) {
  switch (action.type) {
    case SET_HELMET:
      return action.helmet;
    default: return state;
  }
}

export function buildGauntlet(state = null, action = {}) {
  switch (action.type) {
    case SET_GAUNTLET:
      return action.gauntlet;
    default: return state;
  }
}

export function buildChest(state = null, action = {}) {
  switch (action.type) {
    case SET_CHEST:
      return action.chest;
    default: return state;
  }
}

export function buildLegs(state = null, action = {}) {
  switch (action.type) {
    case SET_LEGS:
      return action.legs;
    default: return state;
  }
}

export function buildClassArmor(state = null, action = {}) {
  switch (action.type) {
    case SET_CLASS_ARMOR:
      return action.classArmor;
    default: return state;
  }
}

export function buildHelmetMod(state = null, action = {}) {
  switch (action.type) {
    case SET_HELMET_MOD:
      return action.helmetMod;
    default: return state;
  }
}

export function buildGauntletMod(state = null, action = {}) {
  switch (action.type) {
    case SET_GAUNTLET_MOD:
      return action.gauntletMod;
    default: return state;
  }
}

export function buildChestMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CHEST_MOD:
      return action.chestMod;
    default: return state;
  }
}

export function buildLegsMod(state = null, action = {}) {
  switch (action.type) {
    case SET_LEGS_MOD:
      return action.legsMod;
    default: return state;
  }
}

export function buildClassArmorMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CLASS_ARMOR_MOD:
      return action.classArmorMod;
    default: return state;
  }
}

export function buildHelmetMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_HELMET_MINI_MOD:
      return action.helmetMiniMod;
    default: return state;
  }
}

export function buildGauntletMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_GAUNTLET_MINI_MOD:
      return action.gauntletMiniMod;
    default: return state;
  }
}

export function buildChestMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CHEST_MINI_MOD:
      return action.chestMiniMod;
    default: return state;
  }
}

export function buildLegsMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_LEGS_MINI_MOD:
      return action.legsMiniMod;
    default: return state;
  }
}

export function buildClassArmorMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CLASS_ARMOR_MINI_MOD:
      return action.classArmorMiniMod;
    default: return state;
  }
}
