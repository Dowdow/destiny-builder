import {
  TYPE_HELMET,
  TYPE_GAUNTLET,
  TYPE_CHEST,
  TYPE_LEG,
  TYPE_CLASS_ITEM,
  MOD_HEAD,
  MOD_GAUNTLET,
  MOD_CHEST,
  MOD_LEG,
  MOD_CLASS_ITEM_TITAN,
  MOD_CLASS_ITEM_HUNTER,
  MOD_CLASS_ITEM_WARLOCK,
} from '../utils/const';

export const SET_HELMET = 'SET_HELMET';
export const SET_GAUNTLET = 'SET_GAUNTLET';
export const SET_CHEST = 'SET_CHEST';
export const SET_LEGS = 'SET_LEGS';
export const SET_CLASS_ARMOR = 'SET_CLASS_ARMOR';
export const SET_HELMET_MOD = 'SET_HELMET_MOD';
export const SET_GAUNTLET_MOD = 'SET_GAUNTLET_MOD';
export const SET_CHEST_MOD = 'SET_CHEST_MOD';
export const SET_LEGS_MOD = 'SET_LEGS_MOD';
export const SET_CLASS_ARMOR_MOD = 'SET_CLASS_ARMOR_MOD';
export const SET_HELMET_MINI_MOD = 'SET_HELMET_MINI_MOD';
export const SET_GAUNTLET_MINI_MOD = 'SET_GAUNTLET_MINI_MOD';
export const SET_CHEST_MINI_MOD = 'SET_CHEST_MINI_MOD';
export const SET_LEGS_MINI_MOD = 'SET_LEGS_MINI_MOD';
export const SET_CLASS_ARMOR_MINI_MOD = 'SET_CLASS_ARMOR_MINI_MOD';

export function setHelmet(helmet) {
  return {
    type: SET_HELMET,
    helmet,
  };
}

export function setGauntlet(gauntlet) {
  return {
    type: SET_GAUNTLET,
    gauntlet,
  };
}

export function setChest(chest) {
  return {
    type: SET_CHEST,
    chest,
  };
}

export function setLegs(legs) {
  return {
    type: SET_LEGS,
    legs,
  };
}

export function setClassArmor(classArmor) {
  return {
    type: SET_CLASS_ARMOR,
    classArmor,
  };
}

export function setHelmetMod(helmetMod) {
  return {
    type: SET_HELMET_MOD,
    helmetMod,
  };
}

export function setGauntletMod(gauntletMod) {
  return {
    type: SET_GAUNTLET_MOD,
    gauntletMod,
  };
}

export function setChestMod(chestMod) {
  return {
    type: SET_CHEST_MOD,
    chestMod,
  };
}

export function setLegsMod(legsMod) {
  return {
    type: SET_LEGS_MOD,
    legsMod,
  };
}

export function setClassArmorMod(classArmorMod) {
  return {
    type: SET_CLASS_ARMOR_MOD,
    classArmorMod,
  };
}

export function setHelmetMiniMod(helmetMiniMod) {
  return {
    type: SET_HELMET_MINI_MOD,
    helmetMiniMod,
  };
}

export function setGauntletMiniMod(gauntletMiniMod) {
  return {
    type: SET_GAUNTLET_MINI_MOD,
    gauntletMiniMod,
  };
}

export function setChestMiniMod(chestMiniMod) {
  return {
    type: SET_CHEST_MINI_MOD,
    chestMiniMod,
  };
}

export function setLegsMiniMod(legsMiniMod) {
  return {
    type: SET_LEGS_MINI_MOD,
    legsMiniMod,
  };
}

export function setClassArmorMiniMod(classArmorMiniMod) {
  return {
    type: SET_CLASS_ARMOR_MINI_MOD,
    classArmorMiniMod,
  };
}

export function equipItem(item) {
  return (dispatch) => {
    if (item.bucket.hash === TYPE_HELMET) {
      dispatch(setHelmet(item));
      dispatch(setHelmetMod(null));
      dispatch(setHelmetMiniMod(null));
    }
    if (item.bucket.hash === TYPE_GAUNTLET) {
      dispatch(setGauntlet(item));
      dispatch(setGauntletMod(null));
      dispatch(setGauntletMiniMod(null));
    }
    if (item.bucket.hash === TYPE_CHEST) {
      dispatch(setChest(item));
      dispatch(setChestMod(null));
      dispatch(setChestMiniMod(null));
    }
    if (item.bucket.hash === TYPE_LEG) {
      dispatch(setLegs(item));
      dispatch(setLegsMod(null));
      dispatch(setLegsMiniMod(null));
    }
    if (item.bucket.hash === TYPE_CLASS_ITEM) {
      dispatch(setClassArmor(item));
      dispatch(setClassArmorMod(null));
      dispatch(setClassArmorMiniMod(null));
    }
  };
}

export function unequipItem(item) {
  return (dispatch) => {
    if (item.bucket.hash === TYPE_HELMET) {
      dispatch(setHelmet(null));
      dispatch(setHelmetMod(null));
      dispatch(setHelmetMiniMod(null));
    }
    if (item.bucket.hash === TYPE_GAUNTLET) {
      dispatch(setGauntlet(null));
      dispatch(setGauntletMod(null));
      dispatch(setGauntletMiniMod(null));
    }
    if (item.bucket.hash === TYPE_CHEST) {
      dispatch(setChest(null));
      dispatch(setChestMod(null));
      dispatch(setChestMiniMod(null));
    }
    if (item.bucket.hash === TYPE_LEG) {
      dispatch(setLegs(null));
      dispatch(setLegsMod(null));
      dispatch(setLegsMiniMod(null));
    }
    if (item.bucket.hash === TYPE_CLASS_ITEM) {
      dispatch(setClassArmor(null));
      dispatch(setClassArmorMod(null));
      dispatch(setClassArmorMiniMod(null));
    }
  };
}

export function equipMod(mod) {
  return (dispatch) => {
    if (mod.type === MOD_HEAD) {
      dispatch(setHelmetMod(mod));
    }
    if (mod.type === MOD_GAUNTLET) {
      dispatch(setGauntletMod(mod));
    }
    if (mod.type === MOD_CHEST) {
      dispatch(setChestMod(mod));
    }
    if (mod.type === MOD_LEG) {
      dispatch(setLegsMod(mod));
    }
    if ([MOD_CLASS_ITEM_TITAN, MOD_CLASS_ITEM_HUNTER, MOD_CLASS_ITEM_WARLOCK].includes(mod.type)) {
      dispatch(setClassArmorMod(mod));
    }
  };
}

export function unequipMod(mod) {
  return (dispatch) => {
    if (mod.type === MOD_HEAD) {
      dispatch(setHelmetMod(null));
    }
    if (mod.type === MOD_GAUNTLET) {
      dispatch(setGauntletMod(null));
    }
    if (mod.type === MOD_CHEST) {
      dispatch(setChestMod(null));
    }
    if (mod.type === MOD_LEG) {
      dispatch(setLegsMod(null));
    }
    if ([MOD_CLASS_ITEM_TITAN, MOD_CLASS_ITEM_HUNTER, MOD_CLASS_ITEM_WARLOCK].includes(mod.type)) {
      dispatch(setClassArmorMod(null));
    }
  };
}

export function equipMiniMod(miniMod) {
  return (dispatch) => {
    if (miniMod.hash === TYPE_HELMET) {
      dispatch(setHelmetMiniMod(miniMod));
    }
    if (miniMod.hash === TYPE_GAUNTLET) {
      dispatch(setGauntletMiniMod(miniMod));
    }
    if (miniMod.hash === TYPE_CHEST) {
      dispatch(setChestMiniMod(miniMod));
    }
    if (miniMod.hash === TYPE_LEG) {
      dispatch(setLegsMiniMod(miniMod));
    }
    if (miniMod.hash === TYPE_CLASS_ITEM) {
      dispatch(setClassArmorMiniMod(miniMod));
    }
  };
}
