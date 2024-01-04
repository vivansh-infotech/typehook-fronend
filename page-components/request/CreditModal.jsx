import { IconClose, LogoTypehook } from "@/components/icon";
import { Loader } from "@/components/loader";
import { TEMPLATES } from "@/services";
import { useUserStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreditModal = ({ onClose }) => {
  const router = useRouter();
  const { email } = useUserStore();
  const name = email ? email.split("@")[0] : "";
  const { t } = useTranslation();
  const [selectedDiv, setSelectedDiv] = useState(1);
  const handleDivClick = (divNum) => {
    if (selectedDiv === divNum) {
      setSelectedDiv(null);
    } else {
      setSelectedDiv(divNum);
    }
  };

  const purchaseAddons = useMutation({
    mutationFn: TEMPLATES.purchaseAddons,
    onSuccess: (data) => {
      router.push(data.redirect_to);
    }
  });

  const purchaseAddons2 = useMutation({
    mutationFn: TEMPLATES.purchaseAddons,
    onSuccess: (data) => {
      router.push(data.redirect_to);
    }
  });

  return (
    <>
      <div className="modal-backdrop z-[999999]">
        <div className="modal-container !border-none">
          <div className="dark:bg-none bg-gradient-to-r from-[#555BA5] to-[#69A7E3] p-[1px] rounded-[30px] ">
            <div
              className={`modal-body lg:!w-[829px] md:w-[700px] sm:w-[600px] lg:!p-0  dark:border-0  rounded-[30px] `}
            >
              <div className="flex flex-wrap justify-between items-center ">
                <h2 className="text-20  font-700 leading-6 dark:text-white text-black mb-4"></h2>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center w-full pt-[27px]">
                  <LogoTypehook className="logo inline-block dark:text-white text-black w-[113px] h-[21px] " />
                </div>
                <p className="dark:text-white  font-700 text-black text-[15px] pt-[18px] pb-[10px]">
                  {t("credit.Oh_nein!")} {name}{" "}
                  {t("credit.du_hast_alle_deine_Credits_aufgebraucht.")}
                </p>
                <p className="text-transparent text-14 font-700 bg-clip-text bg-gradient-to-r from-[#69A7E3] to-[#555BA5]">
                  {t(
                    "credit.Fülle_jetzt_deine_Credits_auf_oder_upgrade_deinen_Account."
                  )}
                </p>
              </div>
              <div className="pt-[23px]">
                <div className="grid lg:grid-cols-2 gap-x-[30px] gap-y-[30px]">
                  <div className="mt-auto pt-[1px] px-[1px] lg:pb-0 pb-[1px] bg-gradient-to-r from-[#555BA5] to-[#69A7E3]  rounded-t-[20px] cursor-pointer w-[262px] mx-auto lg:mx-0 lg:ml-auto">
                    <div
                      className={`py-[45px] rounded-t-[20px] ${
                        selectedDiv === 1
                          ? "bg-gradient-to-r from-[#555BA5] to-[#69A7E3] "
                          : "dark:bg-[#212223] bg-white"
                      }`}
                      onClick={() => handleDivClick(1)}
                    >
                      <div className="w-[73px] mx-auto">
                        <LogoTypehook
                          className={`!w-[73px] h-4 mx-auto ${
                            selectedDiv === 1
                              ? "text-white"
                              : "dark:text-white text-black"
                          }`}
                        />
                        <p
                          className={`flex justify-end
                       text-[6px] font-500 ${
                         selectedDiv === 1
                           ? "text-white "
                           : "text-transparent bg-clip-text bg-gradient-to-r from-[#69A7E3] to-[#555BA5]"
                       }`}
                        >
                          {t("profileDropdown.Credits")}
                        </p>
                      </div>
                      <div className="pt-[18px] mx-auto text-center">
                        <p
                          className={`font-500 text-10  max-w-[174px] mx-auto ${
                            selectedDiv === 1
                              ? "text-white"
                              : "dark:text-white text-black"
                          }`}
                        >
                          {t(
                            "credit.Bleibe_effizient_und_nutze_den_Vorsprung_gegenüber_deiner_Konkurrenz.Schalte_hier_ganz_bequem_mit_einem_Klick_weitere_Credits_frei_und"
                          )}
                          {""}
                          {""}{" "}
                          <span className="!font-700">
                            {t("credit.spare_-20% .")}
                          </span>
                        </p>
                        <button
                          disabled={purchaseAddons.isLoading}
                          className={`mt-[23px]  py-[9px] w-[176px] rounded-[10px] text-[9px] font-700 ${
                            selectedDiv === 1
                              ? " bg-white text-[#69A7E3]"
                              : "bg-gradient-to-r from-[#69A7E3] to-[#555BA5] text-white"
                          } `}
                          onClick={() => {
                            purchaseAddons.mutate({ addon_id: 1, quantity: 1 });
                          }}
                        >
                          {purchaseAddons.isLoading ? (
                            <Loader />
                          ) : (
                            `${t("credit.Jetzt_Credits_sichern")}`
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-[1px] px-[1px] lg:pb-0 pb-[1px] bg-gradient-to-r from-[#555BA5] to-[#69A7E3]  rounded-t-[20px] cursor-pointer w-[262px] lg:mx-0 mx-auto">
                    <div
                      className={`py-[45px] rounded-t-[20px] ${
                        selectedDiv === 2
                          ? "bg-gradient-to-r from-[#555BA5] to-[#69A7E3]"
                          : "dark:bg-[#212223] bg-white"
                      }`}
                      onClick={() => handleDivClick(2)}
                    >
                      <div className="w-[73px] mx-auto">
                        <LogoTypehook
                          className={`w-[73px] h-4 mx-auto ${
                            selectedDiv === 2
                              ? "text-white"
                              : "dark:text-white text-black"
                          }`}
                        />
                        <p
                          className={`flex justify-end
                       text-[6px] font-500 ${
                         selectedDiv === 2
                           ? "text-white "
                           : "text-transparent bg-clip-text bg-gradient-to-r from-[#69A7E3] to-[#555BA5]"
                       }`}
                        >
                          {t("credit.Pro")}
                        </p>
                      </div>
                      <div className="pt-[18px] mx-auto text-center">
                        <p
                          className={`font-500 text-10  max-w-[174px] mx-auto ${
                            selectedDiv === 2
                              ? "text-white"
                              : "dark:text-white text-black"
                          }`}
                        >
                          {t(
                            "credit.Du_hast_noch_großes_vor?_Upgrade_deinen_Account_jetzt_auf_typehook.Pro_oder_schicke_uns_eine_Anfrage_für_ein_individuelles_Enterprise-Paket."
                          )}
                        </p>
                        <button
                          disabled={purchaseAddons2.isLoading}
                          className={`mt-[23px] py-[9px] w-[176px] rounded-[10px] text-[9px] font-700 ${
                            selectedDiv === 2
                              ? " bg-white text-[#69A7E3]"
                              : "bg-gradient-to-r from-[#69A7E3] to-[#555BA5] text-white"
                          } `}
                          onClick={() => {
                            purchaseAddons2.mutate({
                              addon_id: 2,
                              quantity: 1
                            });
                          }}
                        >
                          {purchaseAddons2.isLoading ? (
                            <Loader />
                          ) : (
                            `${t("credit.Jetzt_Account_upgraden")}`
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditModal;
CreditModal.auth = "ONLY_LOGIN_USER";
CreditModal.basicAccess = "LOGIN_USER_WITH_BASIC_ACCESS";
