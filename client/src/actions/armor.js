import { callApi } from '../utils/api';

export const SET_ARMORS = 'SET_ARMORS';

export function setArmors(armors) {
  return {
    type: SET_ARMORS,
    armors,
  };
}

export function getAllArmors() {
  return async (dispatch) => {
    const armors = await callApi('armors', {});
    dispatch(setArmors(armors));
  };
}

export function getArmorsByFilter(filters) {
  return async (dispatch) => {
    const armors = await callApi('armors', filters);
    dispatch(setArmors(armors));
  };
}
