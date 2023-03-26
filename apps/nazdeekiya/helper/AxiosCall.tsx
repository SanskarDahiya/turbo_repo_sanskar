import Axios from "axios";
import { useAppStore } from "../stores/AppStore";
import getFingerprint from "./getFingerprint";

export const validateLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return fetch("/user/validate", { username, password });
};

// export const getUserByUserId = async (_id) => {
//   return await fetch("user/getUserById", { _id });
// };

export const createUser = async ({
  username,
  password,
  email,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  return await fetch("/user/create", { username, password, email });
};

// export const sendMessage = async (data) => {
//   if (data && data.to && data.message) {
//     return await fetch("scribble/create", { ...data });
//   }
// };

// export const getAllMessages = async (user) => {
//   if (user) {
//     return await fetch("scribble/getScribbleByUserId", {
//       _id__: "sans123123",
//       user,
//     });
//   }
// };

const fetch = async (url: string | URL, params: any) => {
  if (url instanceof URL) {
    url = url.href;
  } else {
    url = `/api/${url}`;
  }
  const deviceInfo = useAppStore.getState().deviceInfo;
  let visitorId = deviceInfo?.deviceId || deviceInfo?.visitorId;
  try {
    if (!visitorId) {
      const res = await getFingerprint();
      useAppStore.getState().setDeviceInfo({ ...res, deviceId: res.visitorId });
      visitorId = res.visitorId;
    }
  } catch (err) {
    visitorId = "x-error-encounter";
  }
  const result = await Axios({
    method: "post",
    url: url,
    data: params,
    headers: {
      "x-platform": "web",
      "x-request-id": visitorId,
    },
  });
  const { data = [] } = result || {};
  if (data.error) {
    throw data.error;
  }
  return data;
};
