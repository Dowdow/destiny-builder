import { callApi } from '../utils/api';

export const SET_MODS = 'SET_MODS';

export function setMods(mods) {
  return {
    type: SET_MODS,
    mods,
  };
}

export function getAllMods() {
  return async (dispatch) => {
    const mods = await callApi('mods', {});
    dispatch(setMods(mods));
  };
}

export function getModsByFilter(filters) {
  return async (dispatch) => {
    const mods = await callApi('mods', filters);
    dispatch(setMods(mods));
  };
}
