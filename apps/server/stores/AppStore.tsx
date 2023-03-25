import { create } from "zustand";

const store = (set: any) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  deviceInfo: null,
  setDeviceInfo: (deviceInfo: any) => set({ deviceInfo }),
});

export const useAppStore = create(store);
