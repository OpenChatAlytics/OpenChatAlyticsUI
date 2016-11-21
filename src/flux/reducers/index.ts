import { Action } from 'redux';

function noopReducer(state = {}, action: Action) {
  if (!action) {
    return state;
  }
  if (action.type)
  return state;
}

export default noopReducer;