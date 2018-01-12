import { SET_MODS } from '../actions/mod';

export default function mod(state = [], action = {}) {
  switch (action.type) {
    case SET_MODS:
      return action.mods;
    default: return state;
  }
}
