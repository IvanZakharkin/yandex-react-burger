import { combineReducers } from 'redux';
import { builderReducer } from './builder';

export const rootReducer = combineReducers({
  builder: builderReducer,
});