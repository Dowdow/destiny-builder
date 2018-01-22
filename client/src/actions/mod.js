import { callApi } from '../utils/api';

export const SET_MODS_HELMET = 'SET_MODS_HELMET';
export const SET_MODS_GAUNTLET = 'SET_MODS_GAUNTLET';
export const SET_MODS_CHEST = 'SET_MODS_CHEST';
export const SET_MODS_LEGS = 'SET_MODS_LEGS';
export const SET_MODS_CLASS_ARMOR = 'SET_MODS_CLASS_ARMOR';

export function setHelmetMods(mods) {
  return {
    type: SET_MODS_HELMET,
    mods,
  };
}

export function setGauntletMods(mods) {
  return {
    type: SET_MODS_GAUNTLET,
    mods,
  };
}

export function setChestMods(mods) {
  return {
    type: SET_MODS_CHEST,
    mods,
  };
}

export function setLegsMods(mods) {
  return {
    type: SET_MODS_LEGS,
    mods,
  };
}

export function setClassArmorMods(mods) {
  return {
    type: SET_MODS_CLASS_ARMOR,
    mods,
  };
}

export function getHelmetMods() {
  return async (dispatch) => {
    const mods = await callApi('mods', { type: 'helmet', tier: 'legendary' });
    dispatch(setHelmetMods(mods));
  };
}

export function getGauntletMods() {
  return async (dispatch) => {
    const mods = await callApi('mods', { type: 'gauntlet', tier: 'legendary' });
    dispatch(setGauntletMods(mods));
  };
}

export function getChestMods() {
  return async (dispatch) => {
    const mods = await callApi('mods', { type: 'chest', tier: 'legendary' });
    dispatch(setChestMods(mods));
  };
}

export function getLegsMods() {
  return async (dispatch) => {
    const mods = await callApi('mods', { type: 'legs', tier: 'legendary' });
    dispatch(setLegsMods(mods));
  };
}

export function getClassArmorMods(type) {
  return async (dispatch) => {
    const mods = await callApi('mods', { type, tier: 'legendary' });
    dispatch(setClassArmorMods(mods));
  };
}
