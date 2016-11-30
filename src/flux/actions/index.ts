import { Action } from 'redux';
import { createAction } from 'redux-actions';
import * as request from 'superagent';
import * as NProgress from 'nprogress';
import * as moment from 'moment';
export default Action;

export const fetch = createAction('FETCH', async (url: string) => {
  try {
    NProgress.start();
    const response = await request.get(url);
    return response.text;
  } finally {
    NProgress.done();
  }
}, (url: string) => ({ url }));

export const updateDateRange = createAction('UPDATE_DATE_RANGE',
  (start: moment.Moment, end: moment.Moment) => {
    return {
      end,
      start,
    };
});