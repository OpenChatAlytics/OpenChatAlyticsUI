import { message } from 'antd';
import { combineReducers } from 'redux';
import * as Actions from '../actions';
import { routerReducer } from 'react-router-redux';
import { handleActions, ActionMeta } from 'redux-actions';
import * as request from 'superagent';
import * as moment from 'moment';
import { clientReducer, ClientState } from './client';

export class State {
  public readonly client: ClientState;
  public readonly data: Object;
  public readonly dateRange: { end: moment.Moment, start: moment.Moment};
  public readonly routing: any;
}

export const dataReducer = handleActions({
  FETCH: (state, action: ActionMeta<string, { url: string }>) => {
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

export const dateRangeReducer = handleActions({
  UPDATE_DATE_RANGE: (state,
    action: ActionMeta<{ end: moment.Moment, start: moment.Moment}, {}>) => {
    if (action.error) {
      message.error(`Error updating date range.`);
    } else {
      return Object.assign({}, state, action.payload);
    }
  },
}, {
  end: moment().startOf('year'),
  start: moment(),
});

export default combineReducers<State>({
  client: clientReducer,
  data: dataReducer,
  dateRange: dateRangeReducer,
  routing: routerReducer,
});