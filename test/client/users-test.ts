import test from 'ava';

import { setupLocalClientMock } from './_utils';
import Resource from 'src/client/resource';
import Users from 'src/client/users';

const [underTest, nock] = setupLocalClientMock(Users);

test('get user photos should return a map of users to URLs', async (t) => {
  const userPhotos = { user1: 'http://photos.com/photo1' };

  nock.get(`/${Resource.API_URL}/${Users.URL}/photourls`)
    .reply(200, userPhotos);
  const photoURLs = await underTest.getUserPhotoURLs();
  t.is(photoURLs.size, Object.keys(userPhotos).length);
});

test('get user map should return a map of user IDs to User objects', async (t) => {
  const users = {
    k96epf: {
      userId: 'yqnl9',
      email: '39vp@email.com',
      deleted: false,
      groupAdmin: false,
      bot: false,
      name: 'name-cfr3',
      mentionName: 'k96epf',
      photoUrl: 'http://localhost:8080/static/person_48.png',
      lastActiveDate: 1481991416874,
      creationDate: 1481991416874,
      timezone: 'UTC',
    },
    ax938b: {
      userId: 'fbwro',
      email: 'w1zl@email.com',
      deleted: false,
      groupAdmin: false,
      bot: false,
      name: 'name-xlb8',
      mentionName: 'ax938b',
      photoUrl: 'http://localhost:8080/static/person_48.png',
      lastActiveDate: 1481991416874,
      creationDate: 1481991416874,
      timezone: 'UTC',
    },
  };

  nock.get(`/${Resource.API_URL}/${Users.URL}`)
    .reply(200, users);
  const result = await underTest.getUsers();

  t.is(result.size, Object.keys(users).length);
  for (let userId of Object.keys(users)) {
    t.true(result.has(userId));
  }

});