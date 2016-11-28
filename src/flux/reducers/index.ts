import { Action, combineReducers } from 'redux';
import * as Actions from '../actions';
import { routerReducer } from 'react-router-redux';

function noopReducer(state = {}, action: Action) {
  if (!action) {
    return state;
  }
  return state;
}

export default combineReducers({
  noopReducer,
  routing: routerReducer,
});