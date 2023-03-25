import getClient, { getClientDb } from "mongo-client";
import { NextApiRequest, NextApiResponse } from "next";
import { TABLES } from "../../../constants";
import { Wrapper } from "../../../helper";

export default Wrapper(async (req: NextApiRequest) => {
  return true;
  // const { message, from, to } = req.body || {};
  // const { _id: userId } = to || {};
  // if (!message || !to || !userId) {
  //   let err = new Error() as any;;
  //   err.message = "Insufficient Params";

  //   throw err;
  // }
  // const db = await getClientDb();

  // let to_user = await db.collection(TABLES.user).findOne({ _id: userId });
  // if (!to_user || !to_user[0]) {
  //   let err = new Error() as any;;
  //   err.message = "User Not Found";
  //   throw err;
  // }
  // if (!from["_id"] && from["deviceId"]) {
  //   try {
  //     const deviceInfo = await db
  //       .collection(TABLES.user)
  //       .findOne({ deviceId: from["deviceId"] });
  //     let userData = await user__DB.getSingleData({
  //       "device._id": from.device._id,
  //     });
  //     from["_id"] = deviceInfo["_id"];
  //   } catch (err) {
  //     console.log("[unable to find user from device]");
  //   }
  // }
  // // if (from && from["_id"]) {
  // //   from["_id"] = (from["_id"] + "").toLowerCase();
  // // } else {
  // //   if (from && from.device && from.device._id) {
  // //     try {
  // //       const deviceInfo = await db.collection(TABLES.user).findOne({ _id: _id });
  // //       let userData = await user__DB.getSingleData({
  // //         "device._id": from.device._id,
  // //       });
  // //       let { _id: user___ID } = userData || {};
  // //       from = { _id: user___ID, device: from.device };
  // //       // console.log("userData", userData, from);
  // //     } catch (err) {
  // //       from = { device };
  // //     }
  // //   }
  // // }
  // try {
  //   to_user = await scribble.addData({
  //     message,
  //     to,
  //     deleted: false,
  //     from,
  //     _createdOn: new Date().getTime(),
  //   });
  // } catch (err) {
  //   throw err;
  // }
  // return to_user ? [to_user] : [];
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};
