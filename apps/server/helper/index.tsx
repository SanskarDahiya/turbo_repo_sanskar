import { NextApiRequest, NextApiResponse } from "next";

export const Wrapper = (
  cb: (req: NextApiRequest, res: NextApiResponse) => any
) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const result = cb(req, res);
      if (result instanceof Error) {
        throw result;
      }
      res
        .status(200)
        .end(typeof result !== "string" ? JSON.stringify(result) : result);
    } catch (_err) {
      console.log("🚀 ~ file: index.tsx:16 ~ return ~ _err:", _err);
      const err = _err as any;
      const error_code = err?.code;
      const error_message = err?.message;
      res.status(518).end(
        JSON.stringify({
          success: false,
          code: error_code,
          message: error_message,
        })
      );
    }
  };
};

/**
 * 
 * const crypto = require("crypto");

module.exports = {
  encPassword: password => {
    const mykey = crypto.createCipher("aes-128-cbc", password + "");
    let myStr = mykey.update("abc", "utf8", "hex");
    myStr += mykey.final("hex");
    return myStr;
  }
};

 */
