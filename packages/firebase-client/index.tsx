import getFirestore from "./getFirestore";
import { randomUUID } from "crypto";

import * as S_default_Types from "./scribble_types";
import type { IUser, IConnection, IScribble } from "./scribble_types";

export const ScribbleTypes = {
  ...S_default_Types,
};

const db = getFirestore();

export const TABLES = {
  user: "scribble_user",
  connection: "scribble_tokens",
  scribble: "scribble_messages",
};
//https://firebase.google.com/docs/firestore

async function InsertIntoTable(TABLE: string, info: any) {
  if (!info._id) {
    info._id = randomUUID();
  }
  const _id = info._id;
  await db.collection(TABLE).doc(_id).set(info);
}

async function FindFromTable(TABLE: string, doc_id: string) {
  const result = await db.collection(TABLE).doc(doc_id).get();
  if (result.exists === false || result.exists === undefined) {
    return;
  }
  const queryResult = result.data();
  return { ...queryResult, _id: result.id };
}

async function FilterFromTable(
  TABLE: string,
  info: {
    [key: string]: any;
  },
  sort?: {
    [key: string]: number;
  }
) {
  let QueryRef: any = db.collection(TABLE);
  for (let info_key in info) {
    QueryRef = QueryRef.where(info_key, "==", info[info_key]);
  }
  for (let sort_key in sort) {
    QueryRef = QueryRef.orderBy(sort_key, sort[sort_key] > 0 ? "asc" : "desc");
  }
  const result = await QueryRef.get();
  const documents: any[] = [];
  if (result.empty === false || result.empty === undefined) {
    result.forEach((e) => {
      const doc = e.data();
      if (doc) {
        doc["_id"] = e.id;
        documents.push(doc);
      }
    });
  }
  return documents;
}

export const generateNewToken = async (doc: IConnection) => {
  await InsertIntoTable(TABLES.connection, doc);
};

export const generateNewUser = async (doc: IUser) => {
  await InsertIntoTable(TABLES.user, doc);
};

export const generateNewScribble = async (doc: IScribble) => {
  await InsertIntoTable(TABLES.scribble, doc);
};

export const findUserById = async (userId?: string) => {
  if (!userId) return;
  const user = await FindFromTable(TABLES.user, userId);
  return user as IUser | undefined;
};

export const findTokenById = async (
  token: string,
  extra?: {
    [key: string]: any;
  }
) => {
  const tokenResult = await FilterFromTable(TABLES.connection, {
    ...extra,
    access_token: token,
  });

  return tokenResult[0] as IConnection | undefined;
};
export const findScribbleByUserId = async (userID: string) => {
  const ScribbleResult = await FilterFromTable(
    TABLES.scribble,
    {
      to: userID,
      deleted: false,
    },
    { _createdOn: -1, _id: -1 }
  );
  return ScribbleResult as IScribble[] | [];
};
export const findUserByDevice = async (deviceId: string) => {
  const users = await FilterFromTable(TABLES.user, {
    device: deviceId,
  });

  return users[0] as IUser | undefined;
};

export const updateUserInfo = async (userId: any, changes: any) => {
  // const db = await getClientDb();
  // await db.collection(TABLES.user).findOneAndUpdate({ _id: userId }, change);
  const userRef = db.collection(TABLES.user).doc(userId);
  try {
    const res = await db.runTransaction(async (t) => {
      const doc = await t.get(userRef);
      const currentUserData = doc.data();
      if (
        doc.exists === false ||
        doc.exists === undefined ||
        !currentUserData
      ) {
        return;
      }
      const set = changes["$set"];
      const inc = changes["$inc"];
      for (let inc_key in inc) {
        await t.update(userRef, {
          [inc_key]: (currentUserData[inc_key] || 0) + (inc[inc_key] || 1),
        });
      }

      for (let set_key in set) {
        await t.update(userRef, { [set_key]: set[set_key] });
      }
      return "Updated";
      // if (newPopulation <= 1000000) {
      // await t.update(userRef, { population: newPopulation });
      //   return `Population increased to ${newPopulation}`;
      // } else {
      //   throw 'Sorry! Population is too big.';
      // }
    });

    console.log("Transaction success", res);
  } catch (e) {
    console.log("Transaction failure:", e);
    throw e;
  }
};

export const getPublicScribble = async () => {
  const ScribbleResult = await FilterFromTable(
    TABLES.scribble,
    {
      isPublic: true,
      deleted: false,
    },
    { _createdOn: -1, _id: -1 }
  );
  return ScribbleResult as IScribble[] | [];
};

export const removeOldTokens = async (
  userId: string,
  {
    accessToken,
  }: {
    accessToken: string;
  }
) => {
  let isFetchingData = true;
  while (isFetchingData) {
    const TokenResults = await FilterFromTable(TABLES.connection, {
      userId: userId,
    });
    if (TokenResults.length) {
      const batch = db.batch();
      TokenResults.forEach(({ _id }) => {
        const docRef = db.collection(TABLES.connection).doc(_id);
        batch.delete(docRef);
      });

      batch.commit();
    } else {
      isFetchingData = false;
    }
  }
  isFetchingData = true;
  while (isFetchingData) {
    const TokenResults = await FilterFromTable(TABLES.connection, {
      access_token: accessToken,
    });
    if (TokenResults.length) {
      const batch = db.batch();
      TokenResults.forEach(({ _id }) => {
        const docRef = db.collection(TABLES.connection).doc(_id);
        batch.delete(docRef);
      });

      batch.commit();
    } else {
      isFetchingData = false;
    }
  }
};
