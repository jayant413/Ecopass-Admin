import { create } from "zustand";

interface CookieStore {
  cookieName: String;
  cookieValue: String;
  onSetCookie: (token: String) => void;
}

export const useCookie = create<CookieStore>((set) => ({
  cookieName: "",
  cookieValue: "",
  onSetCookie: (token) => set({ cookieName: "token", cookieValue: token }),
}));
