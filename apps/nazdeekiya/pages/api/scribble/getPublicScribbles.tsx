import { NextApiRequest, NextApiResponse } from "next";
import { Wrapper } from "../../../helper";

export default Wrapper(async function handler(req: NextApiRequest) {
  // res.status(200).end(JSON.stringify({ success: true }));

  return { success: true };
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};
