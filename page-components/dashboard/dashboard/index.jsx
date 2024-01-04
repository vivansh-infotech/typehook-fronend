import Layout from "@/components/layout";
import { useToast } from "@/components/notification";
import { useLogout } from "@/hooks/auth/useLogout";
import { TEMPLATES } from "@/services";
import { useAccordionStore, useSidebarStore, useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { logout } = useLogout();

  // const setAccordion = useAccordionStore((state) => state.setAccordion);
  // const setSidebar = useSidebarStore((state) => state.setSidebar);
  const setRequest = useUserStore((state) => state.setRequest);
  const purchaseSuccess = useMutation({
    mutationFn: TEMPLATES.purchaseAddonsSuccess,
    onSuccess: (data) => {
      setRequest(data?.user?.plan?.request_left);
    },
    onError: (error) => {
      logout();
      makeToast({
        type: "error",
        message: t("error.wrong")
      });
    }
  });
  const verifySession = async (sessionId) => {
    purchaseSuccess.mutate({
      session_id: sessionId
    });
  };

  useEffect(() => {
    if (router?.query?.session_id) {
      verifySession(router.query.session_id);
    }
  }, [router?.query]);
  return (
    <Layout sidebar={true}>
      <div className="h-[calc(100vh-67px)] dark:bg-primary bg-white overflow-y-auto">
        <div className="px-[14px] pt-14 pb-4">
          <div className="hidden sm:block">
            <div className="grid grid-cols-12 gap-[18px]">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-3 order-1 xl:order-1 dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <img
                  className="rounded-t-[30px] m-auto w-full"
                  src="/image/icons-templates.png"
                  alt=""
                />

                <div className="py-11 text-black dark:text-white text-center">
                  <p className="font-700  text-14  ">
                    {t("dashboard.Neue_Templates_title")}
                  </p>
                  <div className="pt-[18px] text-[12px] px-8 font-400 xl:text-[12px] leading-[13px]">
                    <p>{t("dashboard.Neue_Templates_discription1")}</p>
                    <p className="pt-4">
                      {t("dashboard.Neue_Templates_discription2")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-12 lg:col-span-6 order-3 md:order-1 lg:order-2">
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-[23px]">
                  <div className="order-1 grid grid-cols-12 md:pl-9 py-6 items-center rounded-[30px] text-black dark:text-white text-center lg:text-left dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50">
                    <div className="col-span-12 lg:col-span-5 rounded-[30px]">
                      <p className="font-700 text-14">
                        {t("dashboard.Roadmap_title")}
                      </p>
                      <div className="pt-3 font-400 text-[12px] leading-[13px]">
                        <p>{t("dashboard.Roadmap_discription1")}</p>
                        <p className="pt-3 pr-5">
                          {t("dashboard.Roadmap_discription2")}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-7 rounded-[30px]">
                      <img
                        className="ml-auto pl-8"
                        src="/image/roadmap.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="order-2 grid grid-cols-1 items-center rounded-[30px] text-black dark:text-white text-left dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50">
                    <img
                      className="m-auto min-w-[262px] py-[62px]"
                      src="/image/logo-frame.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-3 lg:order-2 xl:order-3 dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px] relative">
                <div className="px-[18px] pt-11 pb-5 text-black dark:text-white text-center">
                  <p className="font-700 text-14">
                    {t("dashboard.Darkmode_integrierung_title")}
                  </p>
                  <div className="pt-[9px] text-[12px]">
                    <p className="font-700">
                      {t("dashboard.Darkmode_integrierung_discription1")}
                    </p>
                    <p className="pt-3 font-400 leading-[13px] px-4">
                      {t("dashboard.Darkmode_integrierung_discription2")}
                    </p>
                  </div>
                </div>
                <img
                  className="m-auto md:absolute bottom-0 left-0 right-0 w-[149px] h-[196px]"
                  src="/image/dark-mode-integration.png"
                  alt=""
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-stretch">
              <div className="dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <div className="px-[18px] py-9 text-black dark:text-white text-center">
                  <div className="min-h-[80px]">
                    <img
                      className="m-auto w-[229px]"
                      src="/image/24X7.png"
                      alt=""
                    />
                  </div>
                  <p className="font-700 text-14 ">
                    {t("dashboard.24/7_Support_title")}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px] px-7">
                    <p>
                      {t("dashboard.24/7_Support_discription1")}
                      <span className="font-700">
                        {""} {t("dashboard.24/7_Support_discription2")} {""}
                      </span>
                      {t("dashboard.24/7_Support_discription3")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <div className="px-[18px] py-9 text-black dark:text-white text-center">
                  <div className="">
                    <div className="relative w-[250px] m-auto">
                      <input
                        type="email"
                        id=" "
                        className="webkit-appearance-none text-[#959595] block text-10 w-full py-3 pl-3 pr-24 bg-white border-0 outline-0 border-gray-50 rounded-l-[20px]  rounded-[20px] mt-2 "
                        placeholder="E-Mail Adresse"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute top-0 right-0 px-5 placeholder:text-10 font-500 h-full !text-10 text-white bg-[#0074EA] rounded-r-[20px] border-0 border-[#0074EA] "
                      >
                        {t("dashboard.Newsletter_register_text")}
                      </button>
                    </div>
                  </div>

                  <p className="font-700 text-14 pt-8">
                    {t("dashboard.Newsletter_title")}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px] px-8">
                    <p>{t("dashboard.Newsletter_discription1")}</p>
                    <p>
                      {t("dashboard.Newsletter_discription2")}
                      <span className="font-700">
                        {" "}
                        {t("dashboard.Newsletter_discription3")}{" "}
                      </span>
                      {t("dashboard.Newsletter_discription4")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <div className="px-[18px] py-9 text-black dark:text-white text-center">
                  <div className="min-h-[80px]">
                    <img
                      className="m-auto w-[125px]"
                      src="/image/faster-query.png"
                      alt=""
                    />
                  </div>
                  <p className="font-700 text-14">
                    {t("dashboard.Schnellere_Abfrage_title")}{" "}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px] px-8">
                    <p>{t("dashboard.Schnellere_Abfrage_discription1")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <div className="grid grid-cols-12 gap-[18px]">
              <div className="col-span-12 items-center rounded-[30px] text-black dark:text-white text-left dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50">
                <img
                  className="m-auto min-w-[262px] py-[62px]"
                  src="/image/logo-frame.svg"
                  alt=""
                />
              </div>
              <div className="col-span-12 dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <div className="px-[18px] py-9 text-black dark:text-white text-center">
                  <div className="">
                    <div className="relative w-[250px] m-auto">
                      <input
                        type="email"
                        id=" "
                        className="webkit-appearance-none text-[#959595] block text-10 w-full py-3 pl-3 pr-24 bg-white border-0 outline-0 border-gray-50 rounded-l-[20px]  rounded-[20px] mt-2 "
                        placeholder="E-Mail Adresse"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute top-0 right-0 px-5 placeholder:text-10 font-500 h-full !text-10 text-white bg-[#0074EA] rounded-r-[20px] border-0 border-[#0074EA] "
                      >
                        {t("dashboard.Newsletter_register_text")}
                      </button>
                    </div>
                  </div>

                  <p className="font-700 text-14 pt-8">
                    {t("dashboard.Newsletter_title")}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px] px-8">
                    <p>{t("dashboard.Newsletter_discription1")}</p>
                    <p>
                      {t("dashboard.Newsletter_discription2")}
                      <span className="font-700">
                        {t("dashboard.Newsletter_discription3")}{" "}
                      </span>
                      {t("dashboard.Newsletter_discription4")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <div className="px-[18px] py-9 text-black dark:text-white text-center">
                  <div className="min-h-[80px]">
                    <img
                      className="m-auto w-[229px]"
                      src="/image/24X7.png"
                      alt=""
                    />
                  </div>
                  <p className="font-700 text-14 ">
                    {t("dashboard.24/7_Support_title")}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px] px-7">
                    <p>
                      {t("dashboard.24/7_Support_discription1")}
                      <span className="font-700">
                        {t("dashboard.24/7_Support_discription2")}
                      </span>
                      {t("dashboard.24/7_Support_discription3")}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" col-span-12 md:pl-9 py-6 items-center rounded-[30px] text-black dark:text-white text-center lg:text-left dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50">
                <div className="col-span-12 lg:col-span-5 rounded-[30px]">
                  <p className="font-700 text-14">
                    {t("dashboard.Roadmap_title")}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px]">
                    <p>{t("dashboard.Roadmap_discription1")}</p>
                    <p className="pt-3 pr-5">
                      {t("dashboard.Roadmap_discription2")}
                    </p>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-7 rounded-[30px]">
                  <img
                    className="ml-auto pl-8"
                    src="/image/roadmap.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-3  dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <img
                  className="rounded-t-[30px] m-auto w-full"
                  src="/image/icons-templates.png"
                  alt=""
                />

                <div className="py-11 text-black dark:text-white text-center">
                  <p className="font-700  text-14  ">
                    {t("dashboard.Neue_Templates_title")}
                  </p>
                  <div className="pt-[18px] text-[12px] px-8 font-400 xl:text-[12px] leading-[13px]">
                    <p>{t("dashboard.Neue_Templates_discription1")}</p>
                    <p className="pt-4">
                      {t("dashboard.Neue_Templates_discription2")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px]">
                <div className="px-[18px] py-9 text-black dark:text-white text-center">
                  <div className="min-h-[80px]">
                    <img
                      className="m-auto w-[125px]"
                      src="/image/faster-query.png"
                      alt=""
                    />
                  </div>
                  <p className="font-700 text-14">
                    {t("dashboard.Schnellere_Abfrage_title")}{" "}
                  </p>
                  <div className="pt-3 font-400 text-[12px] leading-[13px] px-8">
                    <p>{t("dashboard.Schnellere_Abfrage_discription1")}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 row-span-2 sm:col-span-6 lg:col-span-3 xl:col-span-3 dark:border-black bg-gray-600 dark:bg-[#363738] border border-gray-50 rounded-[30px] relative">
                <div className="px-[18px] pt-11 pb-5 text-black dark:text-white text-center">
                  <p className="font-700 text-14">
                    {t("dashboard.Darkmode_integrierung_title")}
                  </p>
                  <div className="pt-[9px] text-[12px]">
                    <p className="font-700">
                      {t("dashboard.Darkmode_integrierung_discription1")}
                    </p>
                    <p className="pt-3 font-400 leading-[13px] px-4">
                      {t("dashboard.Darkmode_integrierung_discription2")}
                    </p>
                  </div>
                </div>
                <img
                  className="m-auto md:absolute bottom-0 left-0 right-0 w-[149px] h-[196px]"
                  src="/image/dark-mode-integration.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
Dashboard.auth = "ONLY_LOGIN_USER";
Dashboard.basicAccess = "LOGIN_USER_WITH_BASIC_ACCESS";
export default Dashboard;
