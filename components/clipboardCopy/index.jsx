import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { IconAllDownload, IconCopy } from "../icon";

export const ClipboardCopy = ({ copyText = "" }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  return (
    <>
      <div
        onClick={(e) => handleCopyClick(e)}
        className="flex items-center cursor-pointer"
      >
        <button>
          {isCopied
            ? `${t("clipboardCopy.kopiert_text")}`
            : `${t("clipboardCopy.Text_kopieren_text")}`}
        </button>

        <IconCopy className="text-black dark:text-white w-3 h-[14px] ml-[11px]" />
      </div>

      {/* <div className="flex items-center cursor-pointer">
        <button className="text-8 font-500 dark:text-white text-dark">
          {t("clipboardCopy.Alle_herunterladen")}
        </button>

        <IconAllDownload className="text-black dark:text-white w-3 h-[14px] ml-[11px]" />

      </div> */}

      <input
        type="text"
        name=""
        readOnly
        id=""
        value={copyText && copyText}
        className="hidden"
      />
    </>
  );
};
