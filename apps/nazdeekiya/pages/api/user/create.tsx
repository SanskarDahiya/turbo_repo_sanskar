import { NextApiRequest } from "next";
import { getClientDb } from "mongo-client";

import { TABLES } from "../../../constants";
import { Wrapper } from "../../../helper";
import { encrypt } from "../../../helper/encrypt";
import { IUser } from "../../../types";

export default Wrapper(async (req: NextApiRequest) => {
  const requestId = req.headers["x-request-id"];
  const { username, password, email } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    !email.trim() ||
    !username.trim() ||
    !password.trim() ||
    username.trim().length <= 3 ||
    password.trim().length <= 3
  ) {
    throw new Error("Invalid Username or Password or Email");
  }

  const db = await getClientDb();

  {
    const userInfo = (await db
      .collection(TABLES.user)
      .findOne({ username })) as unknown as IUser | null;

    if (userInfo) {
      throw new Error("User already exists");
    }
  }

  const actualPassword = await encrypt(password);

  await db.collection(TABLES.user).insertOne({
    _id: username,
    _createdOn: new Date(),
    _updatedOn: new Date(),
    deleted: false,
    name: username,
    password: actualPassword,
    username,
    old_names: [],
    device: requestId,
    isAnonymous: false,
    sendMessageCount: 0,
    getMessageCount: 0,
  });

  return { success: true };
});
