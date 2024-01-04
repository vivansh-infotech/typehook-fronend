import { IconFacebook } from "@/components/icon";
import { useToast } from "@/components/notification";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";

import { AUTH_SERVICE } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
export const FacebookAuth = ({ Loader }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const makeToast = useToast();
  const { setLoggedIn } = useAuth();
  const LoginSocialFacebook = dynamic(
    import("reactjs-social-login").then((res) => res.LoginSocialFacebook),
    {
      suspense: false,
    }
  );
  const faceBookTokenMutation = useMutation({
    mutationFn: AUTH_SERVICE.facebookLogin,
    onSuccess: (data) => {
      Loader(false);
      setLoggedIn(data);
      makeToast({
        type: "success",
        message: `${t("success.Facebook")}`
      });
    },
    onError: (error) => {
      Loader(false);
      makeToast({
        type: "error",
        message: `${t("error.Facebook")}`
      });
    },
  });
  const authError = (message) => {
    makeToast({
      type: "error",
      message: message,
    });
  };
  const verifyToken = (userData) => {
    userData &&
      faceBookTokenMutation.mutate({
        access_token: userData?.accessToken,
        name: userData?.name,
        email: userData?.email,
      });
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <LoginSocialFacebook
      appId={process.env.NEXT_PUBLIC_FACEBOOK_ID || ""}
      onResolve={({ data }) => {
        verifyToken(data);
        Loader(true);
      }}
      onReject={(err) => {
        authError(err);
      }}
    >
      <span className="flex cursor-pointer items-center gap-x-4 md:gap-x-[18px]  py-3 px-[19px] dark:bg-white bg-primary rounded-[10px]">
        <IconFacebook className="w-[22px] h-[22px]" />
        <span className="font-500 text-[10px] dark:text-black text-white">
          {/* Mit Facebook fortfahren */}
          {t("login.facebook")}
        </span>
      </span>
    </LoginSocialFacebook>
  );
};
