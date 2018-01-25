import {
  ADD_BUILD_TO_SAVE,
  DELETE_BUILD,
  SET_BUILD,
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
  RESET_CURRENT_LOADED_BUILD,
} from '../actions/build';

export function buildHelmet(state = null, action = {}) {
  switch (action.type) {
    case SET_HELMET:
      return action.helmet;
    case SET_BUILD:
      return action.build.helmet;
    default: return state;
  }
}

export function buildGauntlet(state = null, action = {}) {
  switch (action.type) {
    case SET_GAUNTLET:
      return action.gauntlet;
    case SET_BUILD:
      return action.build.gauntlet;
    default: return state;
  }
}

export function buildChest(state = null, action = {}) {
  switch (action.type) {
    case SET_CHEST:
      return action.chest;
    case SET_BUILD:
      return action.build.chest;
    default: return state;
  }
}

export function buildLegs(state = null, action = {}) {
  switch (action.type) {
    case SET_LEGS:
      return action.legs;
    case SET_BUILD:
      return action.build.legs;
    default: return state;
  }
}

export function buildClassArmor(state = null, action = {}) {
  switch (action.type) {
    case SET_CLASS_ARMOR:
      return action.classArmor;
    case SET_BUILD:
      return action.build.classArmor;
    default: return state;
  }
}

export function buildHelmetMod(state = null, action = {}) {
  switch (action.type) {
    case SET_HELMET_MOD:
      return action.helmetMod;
    case SET_BUILD:
      return action.build.helmetMod;
    default: return state;
  }
}

export function buildGauntletMod(state = null, action = {}) {
  switch (action.type) {
    case SET_GAUNTLET_MOD:
      return action.gauntletMod;
    case SET_BUILD:
      return action.build.gauntletMod;
    default: return state;
  }
}

export function buildChestMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CHEST_MOD:
      return action.chestMod;
    case SET_BUILD:
      return action.build.chestMod;
    default: return state;
  }
}

export function buildLegsMod(state = null, action = {}) {
  switch (action.type) {
    case SET_LEGS_MOD:
      return action.legsMod;
    case SET_BUILD:
      return action.build.legsMod;
    default: return state;
  }
}

export function buildClassArmorMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CLASS_ARMOR_MOD:
      return action.classArmorMod;
    case SET_BUILD:
      return action.build.classArmorMod;
    default: return state;
  }
}

export function buildHelmetMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_HELMET_MINI_MOD:
      return action.helmetMiniMod;
    case SET_BUILD:
      return action.build.helmetMiniMod;
    default: return state;
  }
}

export function buildGauntletMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_GAUNTLET_MINI_MOD:
      return action.gauntletMiniMod;
    case SET_BUILD:
      return action.build.gauntletMiniMod;
    default: return state;
  }
}

export function buildChestMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CHEST_MINI_MOD:
      return action.chestMiniMod;
    case SET_BUILD:
      return action.build.chestMiniMod;
    default: return state;
  }
}

export function buildLegsMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_LEGS_MINI_MOD:
      return action.legsMiniMod;
    case SET_BUILD:
      return action.build.legsMiniMod;
    default: return state;
  }
}

export function buildClassArmorMiniMod(state = null, action = {}) {
  switch (action.type) {
    case SET_CLASS_ARMOR_MINI_MOD:
      return action.classArmorMiniMod;
    case SET_BUILD:
      return action.build.classArmorMiniMod;
    default: return state;
  }
}

export function savedBuilds(state = {}, action = {}) {
  switch (action.type) {
    case ADD_BUILD_TO_SAVE:
      return Object.assign({}, state, action.build);
    case DELETE_BUILD: {
      const newState = Object.assign({}, state);
      delete newState[action.key];
      return newState;
    }
    default: return state;
  }
}

export function currentLoadedBuild(state = null, action = {}) {
  switch (action.type) {
    case ADD_BUILD_TO_SAVE:
      return {
        id: action.build[Object.keys(action.build)[0]].id,
        name: action.build[Object.keys(action.build)[0]].name,
      };
    case SET_BUILD:
      return { id: action.build.id, name: action.build.name };
    case RESET_CURRENT_LOADED_BUILD:
      return null;
    default:
      return state;
  }
}
