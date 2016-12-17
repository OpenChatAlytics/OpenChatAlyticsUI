interface User {
  userId: string;
  email: string;
  deleted: boolean;
  groupAdmin: boolean;
  bot: boolean;
  name: string;
  mentionName: string;
  photoUrl: string;
  lastActiveDate: number;
  creationDate: number;
  status: string;
  statusMessage: string;
  timezone: string;
  title: string;
}

export default User;