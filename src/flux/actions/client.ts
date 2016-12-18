import Client from 'src/client';
import * as NProgress from 'nprogress';
import { createAction } from 'redux-actions';

const chatalyticsHost = process.env.NODE_ENV === 'development' ? 'http://localhost' : '';
const chatalyticsPort = process.env.NODE_ENV === 'development' ? 8080 : 80;

const client = new Client(chatalyticsHost, chatalyticsPort);

export const getUsers = createAction('GET_USERS', async () => {
  try {
    NProgress.start();
    return await client.users.getUsers();
  } finally {
    NProgress.done();
  }
});