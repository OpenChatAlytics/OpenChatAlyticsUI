import * as nock from 'nock';

import Resource from 'src/client/resource';

type TResource<T extends Resource> = { new (host: string, port: number): T };

export const setupLocalClientMock = <T extends Resource>(c: TResource<T>): [T, nock.Scope ] => {
  const host = 'http://localhost';
  const port = 8080;
  return [new c(host, port), nock(`${host}:${port}`)];
};