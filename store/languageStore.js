import create from "zustand";
import { persist } from "zustand/middleware";

export const useLanguagesStore = create(
  persist(
    (set) => ({
      languages: "de",
      setLanguages: (payload) => {
        set({
          languages: payload,
        });
      },
    }),
    {
      name: "language",
    }
  )
);
