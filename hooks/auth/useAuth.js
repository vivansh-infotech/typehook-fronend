import {
  AXIOS_REMOVE_AUTH_TOKEN,
  AXIOS_SET_AUTH_TOKEN,
  AXIOS_SET_LANGUAGE
} from "@/middleware/axios";
import { AUTH_SERVICE } from "@/services";
import { useAuthStore, useLanguagesStore, useUserStore } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useLogout } from "./useLogout";

const useAuthToken = (token) => {
  useMemo(() => {
    if (token) {
      AXIOS_SET_AUTH_TOKEN(token);
    } else {
      AXIOS_REMOVE_AUTH_TOKEN();
    }
  }, [token]);
};

export const useAuth = (authParams, paymentParam, basicAccess) => {
  const setDefaultLoader = () => {
    // We will show loader for all page except where authentication is not needed
    return authParams === "ONLY_NON_LOGIN_USER" ||
      authParams === "ONLY_LOGIN_USER"
      ? true
      : false;
  };
  const languages = useLanguagesStore((state) => state.languages);
  const isLoggedIn = useAuthStore((state) => state.loggedIn);
  const setUser = useUserStore((state) => state.setUser);
  const setTotalRequestPurchase = useUserStore(
    (state) => state.setTotalRequest
  );
  // console.log(setTotalRequestPurchase, "444");
  // const resetUser = useUserStore((state) => state.resetUser);
  const setUserLoggedIn = useAuthStore((state) => state.setUserLoggedIn);
  // const setUserLoggedOut = useAuthStore((state) => state.setUserLoggedOut);
  const loginToken = useAuthStore((state) => state.loginToken);
  const userPlan = useUserStore((state) => state.plan);
  const [showPageLoader, setShowPageLoader] = useState(setDefaultLoader());
  const { logout } = useLogout();
  const router = useRouter();
  const toLogin = () => {
    router.push("/");
  };
  const toDashboard = () => {
    router.push("dashboard", "dashboard", { locale: languages });
  };
  const toPayment = () => {
    router.push("payment", "payment", { locale: languages });
  };
  AXIOS_SET_LANGUAGE(languages);
  useAuthToken(loginToken);
  useEffect(() => {
    if (loginToken) {
      setShowPageLoader(true);

      const verifyToken = async () => {
        try {
          const useData = await AUTH_SERVICE.verifyToken();
          setUser(useData);
        } catch (error) {
          if (error.status === 401) {
            logout();
          }
        }
      };
      verifyToken();
    }
  }, []);

  // Below logic is for router protection ---
  const protectRoute = () => {
    if (authParams === "ONLY_NON_LOGIN_USER") {
      if (isLoggedIn === true) {
        setShowPageLoader(true);
        toDashboard();
      } else {
        setShowPageLoader(false);
      }
    } else if (authParams === "ONLY_LOGIN_USER") {
      if (paymentParam === "ONLY_LOGIN_USER_NON_PAID") {
        if (isLoggedIn === true) {
          if (userPlan) {
            toDashboard();
          } else {
            setShowPageLoader(false);
          }
        } else {
          toLogin();
        }
      } else if (basicAccess === "LOGIN_USER_WITH_BASIC_ACCESS") {
        setShowPageLoader(false);
      } else {
        if (isLoggedIn === true) {
          if (userPlan) {
            setShowPageLoader(false);
          } else {
            toPayment();
          }
        } else {
          setShowPageLoader(true);
          toLogin();
        }
      }
    } else {
      setShowPageLoader(false);
    }
  };

  useEffect(() => {
    protectRoute();
  }, [router.pathname]);

  // Login  functions
  const setLoggedIn = (data) => {
    if (data?.user?.plan == false || data?.user?.plan?.cancelled_at !== null) {
      setUser(data);
      setUserLoggedIn(data);
      toPayment();
    } else {
      setUser(data);
      setUserLoggedIn(data);
      toDashboard();
    }
    // setTotalRequestPurchase(data?.total_request);
  };

  return {
    isLoggedIn,
    setLoggedIn,

    showPageLoader
  };
};
