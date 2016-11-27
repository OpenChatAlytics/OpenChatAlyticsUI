import { NOTIFY_INIT } from './../actions/index';
import { Action, combineReducers } from 'redux';
import * as Actions from '../actions';

function noopReducer(state = {}, action: Action) {
  if (!action) {
    return state;
  }
  return state;
}

function notifyReducer(state = {}, action: Action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case Actions.NOTIFY_INIT:
      return {
        container: action['container'],
      };
    default:
      return state;
  }
}

export default combineReducers({
  noopReducer,
  notifyReducer,
});