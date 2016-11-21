import { Action } from 'redux';

function noopReducer(state = {}, action: Action) {
  if (!action) {
    return state;
  }
  return state;
}

export default noopReducer;