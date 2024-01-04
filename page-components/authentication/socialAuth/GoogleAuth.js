import { IconGoogle } from "@/components/icon";
import { useToast } from "@/components/notification";
import { useAuth } from "@/hooks/auth";
import { AUTH_SERVICE } from "@/services";
import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
export const GoogleAuth = ({ Loader }) => {
  const { t } = useTranslation();

  const makeToast = useToast();
  const router = useRouter();
  const { setLoggedIn } = useAuth();

  const LoginSocialGoogle = dynamic(
    import("reactjs-social-login").then((res) => res.LoginSocialGoogle),
    {
      suspense: false
    }
  );
  const googleTokenMutation = useMutation({
    mutationFn: AUTH_SERVICE.googleLogin,
    onSuccess: (data) => {
      Loader(false);
      makeToast({
        type: "success",
        message: `${t("success.Google")}`
      });
      setLoggedIn(data);
    },
    onError: (error) => {
      Loader(false);
      makeToast({
        type: "error",
        message: `${t("error.Google")}`
      });
    }
  });

  const authError = (message) => {
    makeToast({
      type: "error",
      message: message
    });
  };

  const verifyToken = (userData) => {
    userData &&
      googleTokenMutation.mutate({
        access_token: userData?.access_token,
        name: userData?.given_name
      });
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    show && (
      <LoginSocialGoogle
        client_id={process.env.NEXT_PUBLIC_GOOGLE_ID || ""}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ data }) => {
          verifyToken(data);
          Loader(true);
        }}
        onReject={(err) => {
          authError(err);
        }}
      >
        <span className="flex cursor-pointer items-center gap-x-[18px]   py-3 px-[24px] dark:bg-white bg-primary rounded-[10px]">
          <IconGoogle className="w-[22px] h-[22px]" />
          <span className="font-500 text-[10px] dark:text-black text-white">
            {/* Mit Google fortfahren */}
            {t("login.google")}
          </span>
        </span>
      </LoginSocialGoogle>
    )
  );
};
