import {
  IconClose,
  IconSqureRightDirection,
  LogoTypehook,
  LogoUser,
} from "@/components/icon";
import LanguageSwitch from "@/components/language/LanguageSwitch";
import { useToast } from "@/components/notification";
import { Dropdown } from "@/containers/Dropdown";
import { ThemeSwitch } from "@/containers/ThemeSwitch";
import { useLogout } from "@/hooks/auth/useLogout";
import CreditModal from "@/page-components/request/CreditModal";
import { AUTH_SERVICE, TEMPLATES } from "@/services";
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Loader } from "../loader";
import RangeBar from "../RangeBar";

const Header = ({ logo, setMenu, setOpen }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { logout } = useLogout();
  const userPlan = useUserStore((state) => state.plan);

  const makeToast = useToast();
  const StripeDetails = useMutation({
    mutationFn: AUTH_SERVICE.stripeBilling,
    onSuccess: (data) => {
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.wrong")}`,
      });
    },
  });
  const stripDetails = async () => {
    StripeDetails.mutate();
  };
  const [credit, setCredit] = useState();
  const { email, id, plan, requestLeft, totalRequest } = useUserStore();
  const name = email ? email.split("@")[0] : "";
  const [planStatusModal, setPlanStatusModal] = useState(false); //for credit modal
  const [creditModalStatus, setCreditModalStatus] = useState(false); //for credit modal

  //addons api
  const purchaseAddons = useMutation({
    mutationFn: TEMPLATES.purchaseAddons,
    onSuccess: (data) => {
      router.push(data.redirect_to);
    },
  });

  useEffect(() => {
    if (plan !== null && requestLeft <= 0) {
      if (
        router.pathname == "/dashboard" ||
        router.pathname == "/dashboard-details/[[...id]]"
      ) {
        setCreditModalStatus(true);
      }
    }
  }, []);

  // if (creditModalStatus) {
  //   return <CreditModal />;
  // }

  return (
    <div className="dark:bg-gray-350 bg-white py-7 px-7 border-b dark:border-black border-gray flex items-center justify-between max-h-[67px] h-full z-50">
      <div className="flex items-center gap-3">
        {!logo && (
          <IconSqureRightDirection
            onClick={() => setMenu(false)}
            className={`w-5 h-5 xl:hidden ${setOpen ? "rotate-180" : ""}`}
          />
        )}

        <Link
          className={`${logo ? "block" : "xl:hidden block"}`}
          href={`${userPlan !== null ? "/dashboard" : "/"}`}
        >
          <LogoTypehook className="logo inline-block dark:text-white text-black w-[113px] h-[21px] " />
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <LanguageSwitch />
        <ThemeSwitch />
        <div className="h-16 flex items-center justify-end py-2 sticky top-0 z-20">
          <Dropdown
            className=" dark:bg-primary bg-white dark:text-white text-black border border-black/10 rounded-20px !left-auto py-2 px-4 min-w-[150px]"
            contentClass="!bottom-16 top-unset"
            content={
              <div className="dark:bg-primary bg-white dark:text-white text-black">
                <div className="font-500 text-[11px] leading-4 py-1">
                  <Link href="/change-password">
                    {" "}
                    {t("profileDropdown.Passwort_ändern")}
                  </Link>
                </div>
                <div className="font-500 text-[11px] leading-4 py-1">
                  <Link href="/history"> {t("profileDropdown.history")}</Link>
                </div>

                {/* <div
                  className="font-500 text-[11px] leading-4 py-1"
                  onClick={() => setPlanStatusModal(true)}
                >
                  <p className="font-500 text-[11px] leading-4 py-1 cursor-pointer">
                    {" "}
                    {t("profileDropdown.Credits")}
                  </p>
                </div> */}

                {userPlan !== null ? (
                  <div
                    onClick={() => stripDetails()}
                    className="font-500 text-[11px] leading-4 py-1 cursor-pointer"
                  >
                    {t("profileDropdown.Abonnement_verwalten")}
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={() => logout()}
                  className="font-500 text-[11px] leading-4 py-1 cursor-pointer"
                >
                  {" "}
                  {t("profileDropdown.Ausloggen")}
                </div>
              </div>
            }
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <LogoUser className="w-6 h-6  text-black dark:text-[#D3D3D3]" />
            </div>
          </Dropdown>
          {/* {planStatusModal && (
            <div className="modal-backdrop">
              <div className="modal-container">
                <div
                  className={`modal-body lg:!w-[829px] md:w-[700px] sm:w-[600px] lg:!p-0`}
                >
                  <div className="flex flex-wrap justify-between items-center ">
                    <h2 className="text-20  font-700 leading-6 dark:text-white text-black mb-4"></h2>
                    <IconClose
                      onClick={() => setPlanStatusModal(false)}
                      className="w-5 h-5 cursor-pointer dark:text-white close-icon"
                    />
                  </div>
                  <div className="">
                    <div className="flex justify-center items-center w-full pt-[14px]">
                      <LogoTypehook className="logo inline-block dark:text-white text-black w-[113px] h-[21px] " />
                    </div>
                    <p className="dark:text-white text-black text-12 md:text-[15px] font-700 text-center mx-auto pt-[21px] pb-[12px]">
                      {t("credit.Hallo")} {name}{" "}
                      {t("credit.hier_siehst_du_dein_Credit_Overview.")}
                    </p>
                    <div className="mx-auto w-full  flex flex-col justify-center items-center">
                      <RangeBar
                        className=""
                        value={requestLeft}
                        max={totalRequest}
                      />
                    </div>

                    <div className="bg-gradient-to-r from-[#555BA5] to-[#69A7E3] p-[1px] mt-[35px] mb-[23px]"></div>

                    <h4 className="text-14 dark:text-white text-black font-700 text-center pb-[11px]">
                      {t("credit.Weitere_Credits_sichern_und_sparen.")}
                    </h4>
                    <p className="text-12 dark:text-white text-black font-500 text-center">
                      {t(
                        "credit.Bleibe_effizient_und_nutze_den_Vorsprung_gegenüber_deiner_Konkurrenz."
                      )}
                      <br></br>
                      {t(
                        "credit.Schalte_hier_ganz_bequem_mit_einem_Klick_weitere_Credits_frei_und_spare_-20%"
                      )}
                    </p>
                    <div className=" pt-[18px] pb-[31px]">
                      <button
                        disabled={purchaseAddons.isLoading}
                        className="flex justify-center items-center mx-auto bg-gradient-to-r from-[#69A7E3] to-[#555BA5] font-700 text-12 dark:text-white text-white w-[243px] h-[35px] rounded-[10px]"
                        onClick={() => {
                          purchaseAddons.mutate({
                            addon_id: 1,
                            quantity: 1,
                          });
                        }}
                      >
                        {purchaseAddons.isLoading ? (
                          <Loader />
                        ) : (
                          `${t("credit.Jetzt_Credits_sichern_und_20%_sparen")}`
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
