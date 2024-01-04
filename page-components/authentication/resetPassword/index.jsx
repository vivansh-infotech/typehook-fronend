import { AUTH_SERVICE } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IconLogo } from "../../../components/icon";
import { Loader } from "../../../components/loader";
import { useToast } from "../../../components/notification";
const resetPasswordSchema = yup.object().shape({
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

const ResetPassword = () => {
  const makeToast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onBlur"
  });
  const [queryParam, setIQueryParam] = useState({});
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    if (router?.query) {
      setIQueryParam(router?.query);
    }
  }, [router?.query]);

  const resetPasswordMutation = useMutation({
    mutationFn: AUTH_SERVICE.restPassword,
    onSuccess: (data) => {
      makeToast({
        type: "success",
        message: `${t("success.resetPassword")}`
      });
      setShowLink(true);
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.resetPassword")}`
      });
    }
  });
  const onSubmit = async (userData) => {
    const setNewData = { ...queryParam, ...userData };
    resetPasswordMutation.mutate(setNewData);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center font-SF-Pro font-500">
      <div className="max-w-[836px] px-4 md:p-0 md:py-4 py-2">
        <div className="flex justify-center items-center gap-x-6 mb-[36px]">
          <IconLogo className="w-5 h-[32px] object-cover dark:text-white text-black" />
          <p className="text-24 font-700">typehook.</p>
        </div>

        <div className="min-w-[246px] max-w-[246px] mx-auto">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-7">
              <label className="font-700 text-[10px] mb-[5px]" htmlFor="">
                Password
              </label>
              <div className="gradient-border-mask">
                <input
                  {...register("password")}
                  className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] w-full dark:!shadow-main shadow-c4 relative z-10 outline-none rounded-[5px] p-4 "
                  type="password"
                />
              </div>
              <p className="text-red-400 mt-2 text-14 p-0">
                {errors.password && errors.password.message}
              </p>
            </div>

            <div className="flex flex-col mb-7">
              <label className="font-700 text-[10px] mb-[5px]" htmlFor="">
                Confirm Password
              </label>
              <div className="gradient-border-mask">
                <input
                  {...register("password_confirmation")}
                  className="webkit-appearance-none h-8 text-[10px] !bg-white/[0.09] w-full dark:!shadow-main shadow-c4 relative z-10 outline-none rounded-[5px] p-4 "
                  type="password"
                />
              </div>
              <p className="text-red-400 mt-2 text-14 p-0">
                {errors.password_confirmation &&
                  errors.password_confirmation.message}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                className="py-2 text-white w-full text-[10px] dark:!shadow-main shadow-c2 font-700 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
                disabled={resetPasswordMutation.isLoading}
              >
                {resetPasswordMutation.isLoading ? <Loader /> : "Submit"}
              </button>
            </div>
          </form>
          <div className="mt-4 m-auto text-center">
            {showLink && (
              <Link className="font-700 underline" href="/">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
