import { combineReducers } from 'redux';
import armor from './armor';
import build from './build';
import language from './language';
import mod from './mod';

const destinyReducer = combineReducers({
  armor,
  build,
  language,
  mod,
});

export default destinyReducer;
