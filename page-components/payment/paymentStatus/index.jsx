import { IconLogo } from "@/components/icon";
import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import { useToast } from "@/components/notification";
import { AUTH_SERVICE } from "@/services";
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const PaymentStatus = () => {
  const makeToast = useToast();
  const router = useRouter();

  const setPlan = useUserStore((state) => state.setPlan);
  const planStatus = useUserStore((state) => state.plan);

  const loginMutation = useMutation({
    mutationFn: AUTH_SERVICE.verifyPayment,
    onSuccess: (data) => {
      setPlan(data?.user?.plan?.status);
      makeToast({
        type: "success",
        message: `${t("success.PaymentStatus")}`
      });
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.PaymentStatus")}`
      });
    }
  });
  const verifySession = async (sessionId) => {
    loginMutation.mutate({
      session_id: sessionId
    });
  };

  useEffect(() => {
    if (router?.query.session_id) {
      verifySession(router?.query.session_id);
    }
  }, [router?.query]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-48px)] w-full flex justify-center items-center">
        <div className="px-4 md:p-0">
          <div className="flex justify-center items-center gap-x-6 mb-14 md:mb-[115px]">
            <IconLogo className="w-8 h-[52px] object-cover" />
            <p className="text-40 font-700">typehook.</p>
          </div>
          <Image
            alt=""
            className="mb-8  md:mb-[58px] mx-auto"
            src="/image/checkmark.png"
            width={64}
            height={64}
          ></Image>
          <div className=" mx-auto ">
            <p className=" text-24 md:text-48 font-700 leading-[35px] md:leading-[64px] text-center">
              Das hat geklappt! Deine Zahlung war erfolgreich 🥳
              <span className="text-16 md:text-24 block">
                {" "}
                Verschiebe nun die Grenzen des Möglichen in Lichtgeschwindigkeit
                mit typehook.{" "}
              </span>
              {planStatus ? (
                <Link
                  className="text-16 md:text-24 text-blue underline block"
                  href="/dashboard"
                >
                  Hier kannst du direkt loslegen →
                </Link>
              ) : (
                <Loader />
              )}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentStatus;
