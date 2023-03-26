import { create } from "zustand";
import { IUser } from "../types";
import { GetResult } from "@fingerprintjs/fingerprintjs";

interface IAppStore {
  user: null | IUser;
  setUser: (user: null | IUser) => void;
  deviceInfo: null | (GetResult & { deviceId: string });
  setDeviceInfo: (deviceInfo: any) => void;
  isMessageSent: boolean;
  setIsMessageSent: (isMessageSent: any) => void;
}

const store = (set: any) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  deviceInfo: null,
  setDeviceInfo: (deviceInfo: any) => set({ deviceInfo }),
  isMessageSent: false,
  setIsMessageSent: (isMessageSent: any) => set({ isMessageSent }),
});

export const useAppStore = create<IAppStore>(store);
