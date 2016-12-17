import Resource from './resource';
import Room from 'src/model/room';

/**
 * Client for the rooms path of the ChatAlytics API
 */
class Rooms extends Resource {

  public static readonly URL = 'rooms';

  constructor(hostname: string, port: number) {
    super(hostname, port);
  }

  /**
   * Fetches all the rooms and returns them as a map of room IDs to room objects
   *
   * @returns A map of room IDs to Rooms
   */
  public async getRooms(): Promise<Map<string, Room>> {
    const jsonObject = await this.getJson(Rooms.URL);
    return this.jsonObjectToMap<Room>(jsonObject);
  }
}

export default Rooms;