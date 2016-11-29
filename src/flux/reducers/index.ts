import { Row } from 'antd';
import { Action, combineReducers } from 'redux';
import * as Actions from '../actions';
import { routerReducer } from 'react-router-redux';

export class State {
  public readonly noopReducer: {};
  public readonly routing: any;
}

function noopReducer(state = {}, action: Action): {} {
  if (!action) {
    return state;
  }
  return state;
}

export default combineReducers<State>({
  noopReducer,
  routing: routerReducer,
});