interface common_mongo {
  _id: string;
  _createdOn: number | Date;
  _updatedOn: number | Date;
  deleted?: boolean;
}

export const modifyUser = (user: IUser) => {
  return {
    _id: user._id,
    _createdOn: user._createdOn,
    _updatedOn: user._updatedOn,
    name: user.name,
    username: user.username,
    old_names: user.old_names,
    isAnonymous: user.isAnonymous,
  };
};
export interface IUser extends common_mongo {
  username: string;
  password: string;
  name: string;
  old_names: string[];
  device: string;
  isAnonymous?: boolean;
  sendMessageCount: number;
  getMessageCount: number;
}

export interface IScribble extends common_mongo {
  message: string;
  from: string;
  to: string;
  isPublic: boolean;
  comments: Omit<IScribble, "comment">[] | [];
}

export interface IConnection extends common_mongo {
  _id: string;
  duration?: number;
  userId?: string;
  deviceId: string;
  access_token: string;
  refresh_token: string;
}
