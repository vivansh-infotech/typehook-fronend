import { AUTH_SERVICE } from "@/services";
import { useAuthStore, useUserStore } from "@/store";
import { useRouter } from "next/router";

export const useLogout = () => {
  const setUserLoggedOut = useAuthStore((state) => state.setUserLoggedOut);
  const resetUser = useUserStore((state) => state.resetUser);

  const router = useRouter();
  const toLogin = () => {
    router.push("/");
  };

  const logout = () => {
    AUTH_SERVICE.logout();
    toLogin();
    resetUser();
    setUserLoggedOut();
  };

  return {
    logout,
  };
};

// This hook for check user authentication & set user authenticate
