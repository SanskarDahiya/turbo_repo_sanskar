import getClient from "mongo-client";
import { Wrapper } from "../../../helper";
import fs from "fs";
export default Wrapper(async () => {
  const c = await getClient();

  return { success: true, c: !!c };
});
