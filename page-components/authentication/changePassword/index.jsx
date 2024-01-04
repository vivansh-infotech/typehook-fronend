import { IconLogo } from "@/components/icon";
import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import { useToast } from "@/components/notification";
import { AUTH_SERVICE } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  current_password: yup
    .string()
    .required("Bitte Passwort eingeben")
    .typeError("")
    .min(8, "Die Passwortlänge sollte mindestens 8 Zeichen betragen")
    .max(20, "Das Passwort darf nicht länger als 30 Zeichen sein"),

  password: yup
    .string()
    .required("Bitte Passwort eingeben")
    .typeError("")
    .min(8, "Die Passwortlänge sollte mindestens 8 Zeichen betragen")
    .max(20, "Das Passwort darf nicht länger als 30 Zeichen sein"),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Die Passwörter müssen übereinstimmen")
});

const ChangePassword = () => {
  const { t } = useTranslation();

  const makeToast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "onBlur"
  });

  const changePasswordMutation = useMutation({
    mutationFn: AUTH_SERVICE.changePassword,
    onSuccess: (data) => {
      makeToast({
        type: "success",
        message: `${t("success.changePassword")}`
      });
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.changePassword")}`
      });
    }
  });

  const onSubmit = async (userData) => {
    changePasswordMutation.mutate(userData);
  };

  return (
    <>
      <Layout sidebar={true}>
        <div className="">
          <div className="flex lg:justify-start justify-center px-4 md:p-0 md:py-4 py-2">
            <div className="w-full md:min-w-[246px] max-w-[246px] mb-[50px] md:ml-12">
              <div className="text-14 font-700 leading-6 dark:text-white text-black my-5">
                {t("changePassword.title")}
              </div>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-4">
                  <label className="font-700 text-[10px] mb-[5px]" htmlFor="">
                    {t("changePassword.current_passwort_label")}
                  </label>
                  <div className="">
                    <input
                      {...register("current_password")}
                      className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] w-full dark:!shadow-main shadow-c4 relative z-10 outline-none  rounded-[5px] p-4"
                      type="password"
                    />
                  </div>
                  <p className="text-red-400 text-[10px] mt-2 p-0">
                    {errors.current_password && errors.current_password.message}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="font-700 text-[10px] mb-[5px]" htmlFor="">
                    {t("changePassword.confirm_passwort_label")}
                  </label>
                  <div className="">
                    <input
                      {...register("password")}
                      className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] shadow-c4 relative z-10 outline-none w-full  rounded-[5px] p-4 "
                      type="password"
                    />
                  </div>
                  <p className="text-red-400 text-[10px] mt-2 p-0">
                    {errors.password && errors.password.message}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="font-700 text-[10px] mb-[5px]" htmlFor="">
                    {t("changePassword.Submit_text")}
                  </label>
                  <div className="">
                    <input
                      {...register("password_confirmation")}
                      className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] shadow-c4 relative z-10 outline-none w-full  rounded-[5px] p-4"
                      type="password"
                    />
                  </div>
                  <p className="text-red-400 text-[10px] mt-2 p-0">
                    {errors.password_confirmation &&
                      errors.password_confirmation.message}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button
                    disabled={changePasswordMutation.isLoading}
                    className="py-2 text-white w-full text-[10px] dark:!shadow-main shadow-c2 font-700 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
                  >
                    {changePasswordMutation.isLoading ? (
                      <Loader />
                    ) : (
                      `${t("changePassword.Submit_text")}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ChangePassword;
