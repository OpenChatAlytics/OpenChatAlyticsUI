import test from 'ava';
import Client from 'src/client/index';
import Users from 'src/client/users';

test('client instantiates all resources with correct types', async (t) => {
  const client = new Client('localhost', 3000);
  t.true(client.users instanceof Users);
});