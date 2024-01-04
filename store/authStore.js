import create from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      loggedIn: false,
      loginToken: null,

      setUserLoggedIn: (payload) => {
        set({
          loggedIn: true,
          loginToken: payload.access_token ? payload.access_token : null
        });
      },
      setUserLoggedOut: () => {
        set({
          loggedIn: false,
          loginToken: null
        });
      }
    }),
    {
      name: "auth-storage"
    }
  )
);
