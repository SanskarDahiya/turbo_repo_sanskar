import getClient, { getClientDb } from "mongo-client";
import { NextApiRequest } from "next";
import { TABLES } from "../../../constants";
import { Wrapper } from "../../../helper";
import { GenerateNewToken } from "../../../helper/generateTokens";
import { IConnection, IUser, modifyUser } from "../../../types";

// // user__DB.getAllData({}).then(res => {
// //   res.map(user => {
// //     user__DB.updateData({ _id: user._id }, { $set: { deleted: false } }).then(res => {
// //       console.log(user._id);
// //     });
// //   });
// // });

// const updateAllPostWithout_id = async (userId, deviceId) => {
//   try {
//     console.log("Updating Data");

//     const allData = await scribble__DB.getAllData({
//       $and: [{ "from._id": null }, { "from.device": deviceId }],
//     });
//     allData.map(async (item) => {
//       await scribble__DB.updateData(
//         { _id: ObjectId(item._id) },
//         { $set: { from: { ...item.from, _id: userId } } }
//       );
//     });
//     console.log("Data updated for", userId, allData.length);
//   } catch (err) {
//     console.log(err);
//   }
// };
// const createUser = async (req) => {
//   const { user } = req.body;
//   let err;
//   let { password, _id } = user || {};
//   if (!user || !_id || !password) {
//     err = new Error() as any;;
//     err.message = "Insufficient Params";
//     err.code = "Insufficient Params";
//     return err;
//   }
//   if (typeof _id != "string") {
//     err = new Error() as any;;
//     err.message = "_id must be string";
//     err.code = "_id must be string";
//     return err;
//   }
//   _id = (_id + "").toLowerCase();
//   newName = password;
//   password = encPassword(password);
//   console.log(_id);
//   let result;
//   try {
//     result = await user__DB.addData({
//       ...user,
//       _id,
//       newName,
//       deleted: false,
//       password,
//       _createdOn: new Date().getTime(),
//     });
//   } catch (err) {
//     console.log(err);
//     err = new Error() as any;;
//     err.message = "Username already exists";
//     err.code = "Username already exists";
//     throw err;
//   }
//   return result ? [result] : [];
// };

// const validateUser = async (req) => {
//   const { username, password, device = false } = req.body;

//   if (!username || !password) {
//     let err = new Error() as any;;
//     err.message = "Insufficient Params";
//     err.code = "Insufficient Params";
//     return err;
//   }
//   const query = {
//     $and: [
//       { _id: (username + "").toLowerCase() },
//       { password: encPassword(password) },
//     ],
//   };
//   let result = await user__DB.getSingleData(query, { newName: 0 });
//   if (result) {
//     let connectionResult = await conn.getSingleData({
//       user: { _id: result._id },
//     });
//     const time = new Date().getTime();
//     if (!connectionResult || connectionResult._expireOn < time) {
//       connectionResult = {
//         _id: uuid(),
//         _createdOn: time,
//         _expireOn: time + 1000 * 60 * 60,
//         user: { _id: result._id },
//       };
//       await conn.addData(connectionResult);
//     }
//     result = {
//       _id: result._id,
//       username: result.username,
//       _createdOn: result._createdOn,
//       conn: connectionResult._id,
//     };
//   }
//   if (!result.device && device) {
//     result["device"] = device;
//     console.log("Updating Data");

//     user__DB.updateData({ _id: result._id }, { $set: { device } }).then(() => {
//       console.log("Updating Data");
//       updateAllPostWithout_id(result._id, device._id);
//     });
//   } else if (device && device._id) {
//     updateAllPostWithout_id(result._id, device._id);
//   }
//   return result ? [result] : [];
// };

// const getUserById = async (req) => {
//   const { _id } = req.body;
//   if (!_id) {
//     let err = new Error() as any;;
//     err.message = "Insufficient Params";
//     err.code = "Insufficient Params";
//     return err;
//   }
//   const query = { _id: (_id + "").toLowerCase() };
//   const result = await user__DB.getSingleData(query, { newName: 0 });
//   return result ? [result] : [];
// };

// const updateUser = async (req) => {
//   const { _id, data = {} } = req.body;
//   if (!_id || !data) {
//     let err = new Error() as any;;
//     err.message = "Insufficient Params";
//     err.code = "Insufficient Params";
//     return err;
//   }
//   let { _id: abcd, password, username, ...rest } = data || {};
//   if (Object.keys(rest).length <= 0) {
//     let err = new Error() as any;;
//     err.message = "No data to update";
//     err.code = "No data to update";
//     return err;
//   }
//   const find = { _id: (_id + "").toLowerCase() };
//   let result = await user__DB.getAllData(find);
//   if (!result || !result[0]) {
//     let err = new Error() as any;;
//     err.message = "User Not Found";
//     err.code = "User Not Found";
//     return err;
//   }
//   rest[" _updatedOn"] = new Date().getTime();
//   const update = { $set: rest };
//   await user__DB.updateData(find, update);
//   result = [Object.assign(result[0], rest)];
//   return result || [];
// };
// const special = async () => {
//   let data = {}; //fs.readFileSync("D://new/backup.json", { encoding: "utf8" });
//   // data = JSON.parse(data);
//   let {
//     userCount = 0,
//     messageCount = 0,
//     users = [],
//     messages = [],
//   } = data || {};
//   userCount = Number(userCount) || 0;
//   messageCount = Number(messageCount) || 0;
//   console.log(userCount, messageCount);

//   let newUsers = await userDB.find({}).sort({ _createdOn: -1 }).skip(userCount);
//   let newMessages = await scribbleDB
//     .find({})
//     .sort({ _createdOn: -1 })
//     .skip(messageCount);
//   let result = {
//     userCount: newUsers.length,
//     messageCount: newMessages.length,
//     users: newUsers,
//     messages: newMessages,
//   };
//   data["users"] = [...newUsers, ...users];
//   data["messages"] = [...newMessages, ...messages];
//   data["userCount"] = userCount + newUsers.length;
//   data["messageCount"] = messageCount + newMessages.length;
//   console.log("new recived", newUsers.length, newMessages.length);
//   console.log("total", data["userCount"], data["messageCount"]);

//   fs.writeFileSync("D://new/backup.json", JSON.stringify(data), {
//     encoding: "utf8",
//   });
//   return result || {};
// };
// router.all("/create", serverPrefix(createUser));
// router.all("/validate", serverPrefix(validateUser));
// router.all("/getUserById", serverPrefix(getUserById));
// router.all("/updateUser", serverPrefix(updateUser));
// // router.all("/kjvcs78erhjcsky37rehrf7", serverPrefix(special));

// router.all(`/`, (req, res) => {
//   res.sendStatus(200);
// });
// router.all("*", (req, res) => {
//   res.sendStatus(401);
// });

// module.exports = router;

export default Wrapper(async (req: NextApiRequest) => {
  const access_token = req.headers.authorization as string;
  if (!access_token) {
    return { success: false, message: "No Token Present" };
  }
  const db = await getClientDb();
  const connInfo = (await db
    .collection(TABLES.connection)
    .findOne({ access_token: access_token })) as unknown as IConnection | null;
  if (!connInfo) {
    return { success: false, message: "No Token Found" };
  }
  const createdDate = new Date(connInfo._createdOn).getTime();
  const currTime = new Date().getTime();

  const timesCreated = Number(((currTime - createdDate) / 1000).toFixed(0));
  const userInfo = (await db
    .collection(TABLES.user)
    // @ts-ignore
    .findOne({ _id: connInfo.userId })) as unknown as IUser | null;
  if (!userInfo || userInfo.deleted) {
    return {
      success: false,
      message: "User Not Found",
      isDeleted: !!userInfo?.deleted,
    };
  }

  if (timesCreated < (connInfo.duration || 3600)) {
    return {
      success: true,
      access_token: connInfo.access_token,
      refresh_token: connInfo.refresh_token,
      user: modifyUser(userInfo),
    };
  }

  const result = await GenerateNewToken(userInfo);
  return { success: true, ...result };
});
