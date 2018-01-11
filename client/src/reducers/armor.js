import { SET_ARMORS } from '../actions/armor';

export default function armor(state = { armors: [] }, action = {}) {
  switch (action.type) {
    case SET_ARMORS:
      return Object.assign(state, action.armors);
    default: return state;
  }
}
