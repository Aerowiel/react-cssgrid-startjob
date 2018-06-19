import { combineReducers } from 'redux';

import counter from './Counter/reducer';

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
