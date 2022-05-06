import { combineReducers } from 'redux';
import { builderReducer } from './builder';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  builder: builderReducer,
  auth: authReducer
});
