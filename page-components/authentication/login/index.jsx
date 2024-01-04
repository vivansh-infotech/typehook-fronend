import { IconLogo } from "@/components/icon";
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

const loginSchema = yup.object().shape({
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
    .max(20, "Das Passwort darf nicht länger als 20 Zeichen sein"),

  remember: yup.boolean()
});

const Login = () => {
  const { t } = useTranslation();

  const [ShowLoader, setShowLoader] = useState(false);
  const makeToast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur"
  });
  const { setLoggedIn } = useAuth();
  const loginMutation = useMutation({
    mutationFn: AUTH_SERVICE.login,
    onSuccess: (data) => {
      makeToast({
        type: "success",
        message: `${t("success.login")}`
      });
      setLoggedIn(data);
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.login")}`
      });
    }
  });
  const onSubmit = async (userData) => {
    loginMutation.mutate(userData);
  };

  return (
    <>
      {!ShowLoader ? (
        <div className="min-h-screen w-full flex justify-center items-center font-SF-Pro font-500">
          <div className="max-w-[836px] px-4 md:p-0 md:py-4 py-2">
            <div className="flex justify-center items-center gap-x-[18px] mb-[33px]">
              <IconLogo className="w-5 h-[32px] object-cover dark:text-white text-black" />
              <p className="text-24 font-700">typehook.</p>
            </div>

            <div className="max-w-[767px] mx-auto mb-[26px]">
              <p className="text-12 sm:text-[15px] font-500 leading-[35px] text-center dark:text-white text-black">
                {t("login.title")}
                <span className=""> {t("login.title_1")} </span>
                <Link className=" text-blue underline" href="/register">
                  {t("login.title_2")}
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
              <FacebookAuth Loader={(e) => setShowLoader(e)} />
              <GoogleAuth Loader={(e) => setShowLoader(e)} />
            </div>
            <div className="max-w-[246px] mx-auto">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-[15px]">
                  <label className="font-700 text-[10px] mb-[5px]" htmlFor="">
                    {t("login.e-mail_label")}
                  </label>
                  <div className="">
                    <input
                      {...register("email")}
                      className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] w-full dark:!shadow-main shadow-c4 relative z-10 outline-none  rounded-[5px] p-4 "
                      type="text"
                    />
                  </div>
                  <p className="text-red-400 text-[10px] mt-2 p-0">
                    {errors.email && errors.email.message}
                  </p>
                </div>
                <div className="flex flex-col mb-6">
                  <label className="font-700 mb-[5px] text-[10px]" htmlFor="">
                    {t("login.password_label")}
                  </label>
                  <div className="">
                    <input
                      {...register("password")}
                      className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] shadow-c4 relative z-10 outline-none w-full  rounded-[5px] p-4"
                      type="password"
                    />
                  </div>
                  <p className="text-red-400 text-[10px]  mt-2 p-0">
                    {errors.password && errors.password.message}
                  </p>
                </div>

                <div className="cursor-pointer mb-[22px] flex items-center">
                  <input
                    className="h-3 w-3"
                    {...register("remember")}
                    id="rememberMe"
                    type="checkbox"
                  />
                  <label
                    className="font-700 text-[10px] ml-2 cursor-pointer"
                    htmlFor="rememberMe"
                  >
                    {t("login.remain_signed_in_text")}
                  </label>
                </div>
                <button
                  type="submit"
                  className="py-2 text-white w-full text-[10px] dark:!shadow-main shadow-c2 font-700 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
                  disabled={loginMutation.isLoading}
                >
                  {loginMutation.isLoading ? (
                    <Loader />
                  ) : (
                    `${t("login.login_text")}`
                  )}
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 py-[22px] text-center">
                  <Link
                    href="/register"
                    className="font-500 text-[11px] text-blue underline"
                  >
                    {t("login.Create_new_acc_text")}
                  </Link>
                  <Link
                    href="/forgot-password"
                    className="font-500 text-[11px] font-700 underline"
                  >
                    {t("login.forgot_pass_text")}
                  </Link>
                </div>
              </form>
            </div>
            <p className="text-gray-700 text-center text-[10px] font-500">
              {t("login.description_1")} <br /> {t("login.description_2")}{" "}
              <Link
                target="_blank"
                href="https://www.typehook.com/terms"
                className="dark:text-white text-gray-800"
              >
                {t("login.terms_of_condition_text")}
              </Link>
              {t("login.description_3")}
              <Link
                target="_blank"
                href="https://www.typehook.com/privacy"
                className="dark:text-white text-gray-800"
              >
                {t("login.privacy_policy_text")}
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

export default Login;
