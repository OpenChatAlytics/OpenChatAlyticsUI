import Users from './users';

/**
 * Client containing all the paths for the ChatAltyics API
 */
export class Client {

  public readonly users: Users;

  constructor(hostname: string, port: number) {
    this.users = new Users(hostname, port);
  }
}

export default Client;