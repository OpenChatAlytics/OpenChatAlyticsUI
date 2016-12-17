import Resource from './resource';

/**
 * Client for the users path of the ChatAlytics API
 */
class Users extends Resource {

  private static readonly URL = 'users';

  constructor(hostname: string, port: number) {
    super(hostname, port);
  }

  /**
   * Gets a map of users to photo URLs
   * @returns A map of users to a photo URL
   */
  public async getUserPhotoURLs(): Promise<Map<string, string>> {
    const jsonObj = await this.getJson(`${Users.URL}/photourls`);
    return this.jsonObjectToMap(jsonObj);
  }

}

export default Users;