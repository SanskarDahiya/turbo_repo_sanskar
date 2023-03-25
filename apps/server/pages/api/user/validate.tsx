import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  res.status(200).end(JSON.stringify({ success: true }));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};

/*

const validateUser = async (req) => {
  const { username, password, device = false } = req.body;

  if (!username || !password) {
    let err = new Error() as any;;
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    return err;
  }
  const query = {
    $and: [
      { _id: (username + "").toLowerCase() },
      { password: encPassword(password) },
    ],
  };
  let result = await user__DB.getSingleData(query, { newName: 0 });
  if (result) {
    let connectionResult = await conn.getSingleData({
      user: { _id: result._id },
    });
    const time = new Date().getTime();
    if (!connectionResult || connectionResult._expireOn < time) {
      connectionResult = {
        _id: uuid(),
        _createdOn: time,
        _expireOn: time + 1000 * 60 * 60,
        user: { _id: result._id },
      };
      await conn.addData(connectionResult);
    }
    result = {
      _id: result._id,
      username: result.username,
      _createdOn: result._createdOn,
      conn: connectionResult._id,
    };
  }
  if (!result.device && device) {
    result["device"] = device;
    console.log("Updating Data");

    user__DB.updateData({ _id: result._id }, { $set: { device } }).then(() => {
      console.log("Updating Data");
      updateAllPostWithout_id(result._id, device._id);
    });
  } else if (device && device._id) {
    updateAllPostWithout_id(result._id, device._id);
  }
  return result ? [result] : [];
};
*/
