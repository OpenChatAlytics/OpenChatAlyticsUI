import { message } from 'antd';
import { combineReducers } from 'redux';
import * as Actions from '../actions';
import { routerReducer } from 'react-router-redux';
import { handleActions, ActionMeta } from 'redux-actions';
import * as request from 'superagent';

export class State {
  public readonly data: Object;
  public readonly routing: any;
}

const dataReducer = handleActions({
  ['FETCH']: (state, action: ActionMeta<string, { url: string }>) => {
    if (action.error) {
      message.error(`Error fetching: ${action.meta.url}`);
    } else {
      return Object.assign({}, state, {
        [action.meta.url]: action.payload,
      });
    }
    return state;
  },
}, {});

export default combineReducers<State>({
  data: dataReducer,
  routing: routerReducer,
});