import { SET_ARMORS } from '../actions/armor';

export default function armor(state = [], action = {}) {
  switch (action.type) {
    case SET_ARMORS:
      return action.armors;
    default: return state;
  }
}
