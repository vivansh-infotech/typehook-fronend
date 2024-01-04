import { IconArrowDown, IconTypeHook } from "@/components/icon";
import { getImage } from "@/components/imagepath/getImage";
import { Loader } from "@/components/loader";
import { useToast } from "@/components/notification";
import Accordion from "@/containers/Accordion";
import useCategory from "@/hooks/useCategory";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TEMPLATES } from "@/services/templates";
import { useAccordionStore, useLanguagesStore, useSidebarStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
const DashboardSidebar = () => {
  const { t } = useTranslation();
  const isResponsive = useMediaQuery("(max-width: 1280px)");
  const ActiveItem = useAccordionStore((state) => state.ActiveItem);
  const setSidebar = useSidebarStore((state) => state.setSidebar);
  const sidebarCategories = useSidebarStore((state) => state.categories);
  const { categoriesMutation } = useCategory();
  useEffect(() => {
    if (sidebarCategories.length === 0) {
      categoriesMutation.mutate();
    }
  }, []);
  return (
    <>
      <div className="p-6">
        <h2 className="text-[13px] font-700 leading-6 dark:text-white text-black">
          {t("sidebar.Kategorien_text")}
        </h2>
        {!categoriesMutation.isLoading ? (
          sidebarCategories.map((item, index) => {
            return (
              <div
                key={`acc-${index}`}
                className={`${index == 0 ? "pt-2" : ""}`}
              >
                <div className="sidebar-border-gradient rounded-10px  dark:bg-white/5 bg-white shadow-main dark:shadow-c2 mb-[19px]">
                  <Accordion
                    name={item.name}
                    isActive={ActiveItem}
                    className="relative z-50 "
                    accordion_heading={
                      <div className="flex items-center justify-center py-3 px-3">
                        {item?.icon && (
                          <img
                            className="ml-[8px]"
                            width={19}
                            height={19}
                            src={getImage() + item.icon}
                            alt=""
                          />
                        )}
                        <h2 className="ml-5 font-700 text-[12px] leading-5">
                          {item.name} {index < 3 ? "🔥" : ""}
                        </h2>
                        <IconArrowDown className="w-3 h-[10px] ml-3 block" />
                      </div>
                    }
                    accordion_content={
                      <div className="text-gray-250 dark:text-gray-100 text-14 font-500 px-7 pb-[18px]">
                        <div className="mt-[4px] flex flex-col gap-y-[10px] ">
                          {item?.templates?.map((item, index) =>
                            item.status == 1 ? (
                              <Link
                                onClick={() =>
                                  isResponsive
                                    ? setSidebar(false)
                                    : setSidebar(true)
                                }
                                className="text-[11px] cursor-pointer font-500 inline-block leading-4 hover:underline hover:text-black dark:hover:text-white focus:underline focus:text-black dark:focus:text-white "
                                key={`dashboard-details-${index}`}
                                href={`${
                                  item?.response_type === "image"
                                    ? `/image-generate/${item.id}`
                                    : `/dashboard-details/${item.id}`
                                }`}
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <div
                                key={`coming-soon-${index}`}
                                className="text-[11px] font-500 inline-block leading-4 hover:underline hover:text-black dark:hover:text-white focus:underline focus:text-black dark:focus:text-white "
                              >
                                {item.title}
                                {item.status == 0 ? " (coming soon)" : ""}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            );
          })
        ) : (
          <Loader fullScreen={true} />
        )}
        <Link
          href="/dashboard-details/23"
          className="flex items-center py-3 pl-[22px] w-full text-12 text-white font-700 bg-gradient-to-l from-[#69A7E3] to-[#555BA5] rounded-[10px]"
        >
          <IconTypeHook className="mr-[11px] w-[17px] h-[16px] leading-[14px]" />{" "}
          {t("sidebar.Sei_kreativ_mit_typehook_text")}
        </Link>
      </div>
    </>
  );
};

export default DashboardSidebar;
