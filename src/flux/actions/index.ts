import { Action } from 'redux';
import { createAction } from 'redux-actions';
import * as request from 'superagent';
export default Action;

export const fetch = createAction('FETCH', async (url: string) => {
  const response = await request.get(url);
  return response.text;
}, (url: string) => ({ url }));