import { useUserStore } from "@/store";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
export default function RangeBar({ value, max }) {
  const { requestLeft, totalRequest } = useUserStore();
  const [currentValue, setCurrentValue] = useState(requestLeft, totalRequest);
  const { t } = useTranslation();
  const getBackgroundSize = () => {
    return { backgroundSize: `${(currentValue * 100) / max}% 100%` };
  };

  return (
    <>
      <input
        className="!m-0"
        type="range"
        min="0"
        max={totalRequest}
        onChange={(e) => setCurrentValue()}
        style={getBackgroundSize()}
        value={requestLeft}
      />
      <p className="text-12 dark:text-white text-black font-500 text-center mx-auto pt-2">
        {t("credit.Du_hast_bereits_deiner")}

        <span className="font-700 !text-14">
          {""} {requestLeft}/{totalRequest} {""}
        </span>

        {t("credit.deiner_Credits_genutzt_und_atemraubende_Inhalte_erstellt.")}
      </p>
    </>
  );
}
