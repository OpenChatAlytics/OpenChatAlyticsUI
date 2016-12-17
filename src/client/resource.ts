import * as request from 'superagent';

/**
 * Parent class for all the ChatAlytics API paths
 */
abstract class Resource {

  public static readonly API_URL = 'api/v0';

  protected readonly hostname: string;
  protected readonly port: number;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port;
  }

  /**
   * Converts a JSON object to a map of string keys to V values.
   *
   * @param jsonObj JSON object resulting from JSON#parse.
   * @returns A string map of keys to values
   */
  protected jsonObjectToMap<V>(jsonObject: Object): Map<string, V> {
    return Object.keys(jsonObject)
      .reduce((map, key) => {
        map.set(key, jsonObject[key]);
        return map;
      }, new Map<string, V>());
  }

  /**
   * Gets a JSON string from the ChatAlytics API
   */
  protected async getJson(url: string): Promise<string> {
    const response = await request.get(`${this.hostname}:${this.port}/${Resource.API_URL}/${url}`);
    return JSON.parse(response.text);
  }

}

export default Resource;