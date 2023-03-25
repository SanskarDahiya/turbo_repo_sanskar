import { NextApiRequest } from "next";

import { Wrapper } from "../../../helper";

export default Wrapper(async (req: NextApiRequest) => {
  const { user } = req.body;
  let err;
  let { password, _id } = user || {};
  if (!user || !_id || !password) {
    err = new Error();
    err.message = "Insufficient Params";
    err.code = "Insufficient Params";
    return err;
  }
  if (typeof _id != "string") {
    err = new Error();
    err.message = "_id must be string";
    err.code = "_id must be string";
    return err;
  }
  _id = (_id + "").toLowerCase();
  newName = password;
  password = encPassword(password);
  console.log(_id);
  let result;
  try {
    result = await user__DB.addData({
      ...user,
      _id,
      newName,
      deleted: false,
      password,
      _createdOn: new Date().getTime(),
    });
  } catch (err) {
    console.log(err);
    err = new Error();
    err.message = "Username already exists";
    err.code = "Username already exists";
    throw err;
  }
  return result ? [result] : [];
  return null;
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};
