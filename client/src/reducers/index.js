import { combineReducers } from 'redux';
import armor from './armor';
import build from './build';
import mod from './mod';

const destinyReducer = combineReducers({
  armor,
  build,
  mod,
});

export default destinyReducer;
