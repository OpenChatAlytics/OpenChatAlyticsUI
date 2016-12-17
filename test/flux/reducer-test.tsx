// stub out matchMedia for tests needed by enquire.js
declare var window;
window.matchMedia = window.matchMedia || (() => {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
});

import test from 'ava';
import { dateRangeReducer, dataReducer } from 'src/flux/reducers';
import * as Actions from 'src/flux/actions';
import * as moment from 'moment';
// tslint:disable-next-line:no-var-requires
const ActionsInjector = require('inject-loader!../../src/flux/actions/');

test('date range reducer should store the start and end times from the updateDateRange action',
  (t) => {
  const start = moment();
  const end = moment();
  const initialState = { start: undefined, end: undefined };
  const mutatedState = dateRangeReducer(initialState, Actions.updateDateRange(start, end));
  t.deepEqual(mutatedState, { start, end });
});

test('data reducer should store the fetched data in a map given the fetch action',
  async (t) => {

  const responsePayload = 'data';

  const Actions = ActionsInjector({
    superagent: {
      get: (url: string) => { return { text: responsePayload }; },
    },
  });

  const initialState = { };
  const url = 'url';
  const mutatedState = dataReducer(initialState, Actions.fetch(url));
  const data = await mutatedState[url];
  t.deepEqual(data, responsePayload);
});