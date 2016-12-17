import test from 'ava';

import { setupLocalClientMock } from './_utils';
import Users from 'src/client/users';

const [underTest, nock] = setupLocalClientMock(Users);

test('get user photos should return a map of users to URLs', async (t) => {
  const userPhotos = { user1: 'http://photos.com/photo1' };

  nock.get('/api/v0/users/photourls')
    .reply(200, userPhotos);
  const photoURLs = await underTest.getUserPhotoURLs();
  t.is(photoURLs.size, Object.keys(userPhotos).length);
});