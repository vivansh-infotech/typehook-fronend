import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      email: null,
      id: null,
      plan: null,
      requestLeft: null,
      totalRequest: null,
      setUser: (payload) => {
        set({
          email: payload.user.email ? payload.user.email : null,
          id: payload.user.id ? payload.user.id : null,
          plan: payload.user.plan.status ? payload.user.plan.status : null,
          requestLeft: payload.user.plan.request_left
            ? payload.user.plan.request_left
            : null,
          totalRequest: payload.user.plan.total_request
            ? payload.user.plan.total_request
            : null
        });
      },
      setRequestLeft: (payload) => {
        set({
          requestLeft: payload ? payload : null
        });
      },
      setPlan: (payload) => {
        set({
          plan: payload ? payload : null
        });
      },
      setTotalRequest: (payload) => {
        set({
          totalRequest: payload ? payload : null
        });
      },

      resetUser: () => {
        set({
          email: null,
          id: null,
          plan: null,
          requestLeft: null,
          totalRequest: null
        });
      }
    }),
    {
      name: "user-storage"
    }
  )
);
