import test from 'ava';

import { setupLocalClientMock } from './_utils';
import Resource from 'src/client/resource';
import Rooms from 'src/client/rooms';

const [underTest, nock] = setupLocalClientMock(Rooms);

test('get rooms map should return a map of room IDs to Room objects', async (t) => {
  const rooms = {
    scsyj: {
      room_id: 's62f8',
      name: 'room-scsyj',
      topic: 'random topic',
      last_active_date: 1481991416874,
      creation_date: 1481991416874,
      owner_user_id: 'odk5o',
      archived: false,
      private_room: false,
    },
  };

  nock.get(`/${Resource.API_URL}/${Rooms.URL}`)
    .reply(200, rooms);
  const result = await underTest.getRooms();

  t.is(result.size, Object.keys(rooms).length);
  for (let userId of Object.keys(rooms)) {
    t.true(result.has(userId));
  }

});