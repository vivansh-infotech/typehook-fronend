import { LogoTypehook } from "@/components/icon";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { use, useState } from "react";
import { useTranslation } from "react-i18next";
const creditModal = () => {
  const { t } = useTranslation();
  const [selectedDiv, setSelectedDiv] = useState(1);
  const handleDivClick = (divNum) => {
    if (selectedDiv === divNum) {
      setSelectedDiv(null);
    } else {
      setSelectedDiv(divNum);
    }
  };

  return (
    <>
      <div className="modal-container mt-20">
        <div
          className={`modal-body lg:!w-[829px] md:w-[700px] sm:w-[600px] lg:!p-0`}
        >
          <div className="flex flex-wrap justify-between items-center ">
            <h2 className="text-20  font-700 leading-6 dark:text-white text-black mb-4"></h2>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center w-full pt-[14px]">
              <LogoTypehook className="logo inline-block dark:text-white text-black w-[113px] h-[21px] " />
            </div>
            <p className="dark:text-white  font-700 text-black text-[15px] pt-[18px] pb-[10px]">
              {t("credit.Oh_nein!")}% {t("credit.username")}%{" "}
              {t("credit.du_hast_alle_deine_Credits_aufgebraucht.")}
            </p>
            <p className="text-transparent text-14 font-700 bg-clip-text bg-gradient-to-r from-[#69A7E3] to-[#555BA5]">
              {t(
                "credit.Fülle_jetzt_deine_Credits_auf_oder_upgrade_deinen_Account."
              )}
            </p>
          </div>
          <div className="pt-4">
            <div className="grid grid-cols-2 gap-x-[30px] ">
              <div
                className={`border-gradient-color w-[262px] ml-auto px-[44px]  py-[45px] ${
                  selectedDiv === 1
                    ? "bg-gradient-to-r from-[#69A7E3] to-[#555BA5]"
                    : ""
                }`}
                onClick={() => handleDivClick(1)}
              >
                <LogoTypehook
                  className={`w-[73px] h-4 mx-auto ${
                    selectedDiv === 1 ? "text-white" : "text-black"
                  }`}
                />
                <div className="pt-[18px] mx-auto text-center">
                  <p
                    className={`font-500 text-10  max-w-[174px] mx-auto ${
                      selectedDiv === 1 ? "text-white" : "text-black"
                    }`}
                  >
                    {t(
                      "credit.Bleibe_effizient_und_nutze_den_Vorsprung_gegenüber_deiner_Konkurrenz.Schalte_hier_ganz_bequem_mit_einem_Klick_weitere_Credits_frei_und"
                    )}
                    <span className="font-700">{t("credit.spare_-20% .")}</span>
                  </p>
                  <button
                    className={`mt-[23px]  py-[9px] w-[176px] rounded-[10px] text-[9px] font-700 ${
                      selectedDiv === 1
                        ? " bg-white text-[#69A7E3]"
                        : "bg-gradient-to-r from-[#69A7E3] to-[#555BA5] text-white"
                    } `}
                  >
                    {t("credit.Jetzt_Credits_sichern")}
                  </button>
                </div>
              </div>

              <div
                className={`border-gradient-color mx-auto px-[44px] w-[262px]  py-[45px] ${
                  selectedDiv === 2
                    ? "bg-gradient-to-r from-[#69A7E3] to-[#555BA5]"
                    : ""
                }`}
                onClick={() => handleDivClick(2)}
              >
                <LogoTypehook
                  className={`w-[73px] h-4 mx-auto ${
                    selectedDiv === 2 ? "text-white" : "text-black"
                  }`}
                />
                <div className="pt-[18px] mx-auto text-center">
                  <p
                    className={`font-500 text-10  max-w-[174px] mx-auto ${
                      selectedDiv === 2 ? "text-white" : "text-black"
                    }`}
                  >
                    {t(
                      "credit.Du_hast_noch_großes_vor?_Upgrade_deinen_Account_jetzt_auf_typehook.Pro_oder_schicke_uns_eine_Anfrage_für_ein_individuelles_Enterprise-Paket."
                    )}
                  </p>
                  <button
                    className={`mt-[23px]  py-[9px] w-[176px] rounded-[10px] text-[9px] font-700 ${
                      selectedDiv === 2
                        ? " bg-white text-[#69A7E3]"
                        : "bg-gradient-to-r from-[#69A7E3] to-[#555BA5] text-white"
                    } `}
                  >
                    {t("credit.Jetzt_Account_upgraden")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default creditModal;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
}
