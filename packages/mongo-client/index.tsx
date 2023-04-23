import getClient, { getClientDb } from "./client";
export default getClient;
export * from "./client";
export const TABLES = {
  user: "USER",
  connection: "CONNECTIONS",
  scribble: "SCRIBBLE",
};
export const getPublicScribble = async () => {
  const db = await getClientDb();
  const AllMessages = await db
    .collection(TABLES.scribble)
    .find(
      {
        $or: [
          {
            isPublic: true,
            deleted: false,
          },
        ],
      },
      { sort: { _createdOn: -1, _id: -1 } }
    )
    .toArray();
  return AllMessages;
};

export const removeOldTokens = async (
  userId: string,
  {
    accessToken,
  }: {
    accessToken: string;
  }
) => {
  const db = await getClientDb();
  await db.collection(TABLES.connection).updateMany(
    { userId: userId, deleted: false },
    {
      $set: {
        deleted: true,
        _updatedOn: new Date(),
        access_token: "",
        refresh_token: "",
      },
    }
  );
  await db
    .collection(TABLES.connection)
    .deleteMany({ userId: userId, deleted: true });

  await db
    .collection(TABLES.connection)
    .updateMany(
      { access_token: accessToken, deleted: false },
      { $set: { deleted: true, _updatedOn: new Date() } }
    );
};

export const generateNewToken = async (doc: any) => {
  const db = await getClientDb();
  await db.collection(TABLES.connection).insertOne(doc);
};

export const generateNewUser = async (doc: any) => {
  const db = await getClientDb();
  await db.collection(TABLES.user).insertOne(doc);
};

export const generateNewScribble = async (doc: any) => {
  const db = await getClientDb();
  await db.collection(TABLES.scribble).insertOne(doc);
};

export const findUserById = async (userId: any) => {
  const db = await getClientDb();
  const user = await db.collection(TABLES.user).findOne({ _id: userId });
  return user;
};

export const findTokenById = async (
  token: string,
  extra?: {
    [key: string]: any;
  }
) => {
  const db = await getClientDb();
  const TokenResult = db.collection(TABLES.connection).findOne({
    access_token: token,
    ...extra,
  });
  return TokenResult;
};
export const findScribbleByUserId = async (userID: string) => {
  const db = await getClientDb();
  const TokenResult = await db
    .collection(TABLES.scribble)
    .find(
      {
        to: userID,
        deleted: false,
      },
      {
        sort: { _createdOn: -1, _id: -1 },
      }
    )
    .toArray();
  return TokenResult;
};
export const findUserByDevice = async (deviceId: string) => {
  const db = await getClientDb();
  const user = await db.collection(TABLES.user).findOne({ device: deviceId });
  return user;
};

export const updateUserInfo = async (userId: any, change: any) => {
  const db = await getClientDb();
  await db.collection(TABLES.user).findOneAndUpdate({ _id: userId }, change);
};
