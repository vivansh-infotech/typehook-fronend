import { IconFacebook, IconGoogle, IconLogo } from "@/components/icon";
import { Loader } from "@/components/loader";
import { useToast } from "@/components/notification";
import { useAuth } from "@/hooks/auth";
import { FacebookAuth } from "@/page-components/authentication/socialAuth/FacebookAuth";
import { GoogleAuth } from "@/page-components/authentication/socialAuth/GoogleAuth";
import { AUTH_SERVICE } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Bitte Vor-und Nachnamen eintragen")
    .typeError("")
    .min(2, "Vor- und Nachname sollten mindestens 8 Zeichen lang sein")
    .max(25, "Vor- und Nachname dürfen nicht länger als 20 Zeichen sein"),

  email: yup
    .string()
    .email()
    .required("Bitte E-Mail eingeben")
    .typeError("Bitte E-Mail eingeben"),

  password: yup
    .string()
    .required("Bitte Passwort eingeben")
    .typeError("")
    .min(8, "Die Passwortlänge sollte mindestens 8 Zeichen betragen")
    .max(20, "Das Passwort darf nicht länger als 20 Zeichen sein")
});

const Register = () => {
  const { t } = useTranslation();
  const [ShowLoader, setShowLoader] = useState(false);
  const makeToast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur"
  });
  const { setLoggedIn } = useAuth();
  const registerMutation = useMutation({
    mutationFn: AUTH_SERVICE.register,
    onSuccess: (data) => {
      makeToast({
        type: "success",
        message: `${t("success.register")}`
      });
      setLoggedIn(data);
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.register")}`
      });
    }
  });

  const onSubmit = async (userData) => {
    registerMutation.mutate(userData);
  };

  return (
    <>
      {!ShowLoader ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <div className="max-w-[836px] px-4 md:p-0 md:py-4 py-2">
            <div className="flex justify-center items-center gap-x-6 mb-7">
              <IconLogo className="w-5 h-[32px] object-cover dark:text-white text-black" />
              <p className="text-24 font-700">typehook.</p>
            </div>
            <div className="max-w-[516px] mx-auto mb-4">
              <p className="text-[11px] sm:text-[15px] font-700  text-center dark:text-white text-black">
                {t("signUp.title")}
              </p>
              <p className="mb-0 text-center text-12 mt-7 font-700">
                <span className="text-[15px]">{t("signUp.title_1")}</span>
                <Link className="text-[15px] text-blue underline" href="/">
                  {t("signUp.title_2")}
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <FacebookAuth Loader={(e) => setShowLoader(e)} />
              <GoogleAuth Loader={(e) => setShowLoader(e)} />
            </div>
            {/* <div className="max-w-[416px] mx-auto mb-[50px]">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-3">
                  <label className="font-700 mb-1" htmlFor="">
                    Vor- & Nachname
                  </label>
                  <div className="gradient-border-mask">
                    <input
                      {...register("name")}
                      className="h-14 bg-white/[0.03] w-full dark:!shadow-main shadow-c2  relative z-10 outline-none  gradient-border rounded-[10px] p-4 "
                      type="text"
                    />
                  </div>
                  <p className="text-red-400 mt-2 p-0">
                    {errors.name && errors.name.message}
                  </p>
                </div>
                <div className="flex flex-col mb-3">
                  <label className="font-700 mb-1" htmlFor="">
                    E-Mail
                  </label>
                  <div className="gradient-border-mask">
                    <input
                      {...register("email")}
                      className="h-14 bg-white/[0.03] dark:!shadow-main shadow-c2  w-full relative z-10 outline-none  gradient-border rounded-[10px] p-4 "
                      type="email"
                    />
                  </div>
                  <p className="text-red-400 mt-2 p-0">
                    {errors.email && errors.email.message}
                  </p>
                </div>
                <div className="flex flex-col mb-7">
                  <label className="font-700 mb-1" htmlFor="">
                    Passwort
                  </label>
                  <div className="gradient-border-mask ">
                    <input
                      {...register("password")}
                      className="h-14 bg-white/[0.03] dark:!shadow-main shadow-c2  relative z-10 outline-none w-full  rounded-[10px] p-4"
                      type="password"
                    />
                  </div>
                  <p className="text-red-400 mt-2 p-0">
                    {errors.password && errors.password.message}{" "}
                  </p>
                </div>
                <button
                  className="py-[18px] w-full text-white font-700 dark:!shadow-main shadow-c2 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
                  disabled={registerMutation.isLoading}
                >
                  {registerMutation.isLoading ? (
                    <Loader />
                  ) : (
                    "Account erstellen"
                  )}
                </button>
              </form>
            </div> */}
            <p className="text-gray-700 text-[10px] mt-[18px] text-center font-500">
              {t("signUp.description_1")} <br /> {t("signUp.description_2")}
              <Link
                target="_blank"
                href="https://www.typehook.com/terms"
                className="dark:text-white text-gray-800"
              >
                {t("signUp.terms_of_condition_text")}
              </Link>
              {t("signUp.description_3")}
              <Link
                target="_blank"
                href="https://www.typehook.com/privacy"
                className="dark:text-white text-gray-800"
              >
                {t("signUp.privacy_policy_text")}
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      ) : (
        <Loader fullScreen={true} />
      )}
    </>
  );
};

export default Register;
