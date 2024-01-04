import { IconFacebook, IconGoogle, IconLogo } from "@/components/icon";
import { Loader } from "@/components/loader";
import { useToast } from "@/components/notification";
import { AUTH_SERVICE } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Bitte E-Mail eingeben")
    .typeError("Bitte E-Mail eingeben")
});

const ForgotPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const makeToast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur"
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: AUTH_SERVICE.forgetPassword,
    onSuccess: (data) => {
      makeToast({
        type: "success",
        message: `${t("success.forgotPassword")}`
      });
      router.push("/");
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.forgotPassword")}`
      });
    }
  });
  const onSubmit = async (userData) => {
    forgotPasswordMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center font-SF-Pro font-500">
      <div className="max-w-[836px] px-4 md:p-0 md:py-4 py-2">
        <Link href="/">
          <div className="flex justify-center items-center gap-x-4 mb-7">
            <IconLogo className="w-5 h-[32px] object-cover" />
            <p className="text-24 font-700">typehook.</p>
          </div>
        </Link>
        <div className="max-w-[491px] mx-auto mb-3">
          <p className="text-[15px] font-700 text-center">
            {t("forgotPassword.title")}
          </p>
        </div>

        <div className="max-w-[347px] mx-auto mb-[50px]">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-4">
              <label className="font-700 text-[10px] mb-1" htmlFor="">
                {t("forgotPassword.e-mail_label")}
              </label>
              <div className="">
                <input
                  {...register("email")}
                  className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] w-full !shadow-c4 relative z-10 outline-none  rounded-[5px] p-4 "
                  type="email"
                />
              </div>
              <p className="text-red-400 text-[10px] mt-2 p-0">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <button
                disabled={forgotPasswordMutation.isLoading}
                className="p-2 min-w-[155px] text-[10px] text-white  font-700 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
              >
                {forgotPasswordMutation.isLoading ? (
                  <Loader />
                ) : (
                  `${t("forgotPassword.Submit-text")}`
                )}
              </button>
            </div>
          </form>
        </div>
        <p className="text-gray-700 text-center text-[10px] font-500">
          {t("forgotPassword.description_1")} <br />{" "}
          {t("forgotPassword.description_2")}{" "}
          <Link
            target="_blank"
            href="https://www.typehook.com/terms"
            className="dark:text-white text-gray-800"
          >
            {t("forgotPassword.terms_of_condition_text")}
          </Link>
          {t("forgotPassword.description_3")}
          <Link
            target="_blank"
            href="https://www.typehook.com/privacy"
            className="dark:text-white text-gray-800"
          >
            {t("forgotPassword.privacy_policy_text")}
          </Link>{" "}
          .
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
