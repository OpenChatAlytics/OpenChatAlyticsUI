import Resource from './resource';
import User from '../model/user';
/**
 * Client for the users path of the ChatAlytics API
 */
class Users extends Resource {

  public static readonly URL = 'users';

  constructor(hostname: string, port: number) {
    super(hostname, port);
  }

  /**
   * Fetches all the users and returns them as a map of user IDs to user objects
   *
   * @returns A map of user IDs to Users
   */
  public async getUsers(): Promise<Map<string, User>> {
    const jsonObject = await this.getJson(Users.URL);
    return this.jsonObjectToMap<User>(jsonObject);
  }

  /**
   * Gets a map of users to photo URLs
   *
   * @returns A map of users to a photo URL
   */
  public async getUserPhotoURLs(): Promise<Map<string, string>> {
    const jsonObj = await this.getJson(`${Users.URL}/photourls`);
    return this.jsonObjectToMap<string>(jsonObj);
  }

}

export default Users;