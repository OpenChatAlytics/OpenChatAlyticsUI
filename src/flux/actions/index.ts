import { Action } from 'redux';
import { createAction } from 'redux-actions';
import * as request from 'superagent';
import * as NProgress from 'nprogress';
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