import { IconArrowDown } from "@/components/icon";
import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import Accordion from "@/containers/Accordion";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useHistory from "./useHistory";

export const History = () => {
  const { t } = useTranslation();
  const { history, historyMutation } = useHistory();

  return (
    <>
      <Layout sidebar={true}>
        <div className="pt-7 dark:bg-gray-400 bg-white min-h-[calc(100vh)] max-h-[calc(100vh-116px)] xl:max-h-[calc(100vh-48px)] overflow-y-auto">
          <h1 className="text-[13px] font-700 font-SF-Pro leading-3 pl-6 sm:pl-10 dark:text-white text-black">
            {t("history.title")}
          </h1>
          <div className="px-6 sm:px-10 pt-3 mb-24">
            {!historyMutation.isLoading ? (
              history && Array.isArray(history) && history.length > 0 ? (
                history.map((item, index) => (
                  <div key={`history-${index}`} className="rounded-xl">
                    <Accordion
                      className="sidebar-border-gradient rounded-10px dark:bg-white/5 bg-white shadow-main dark:shadow-c2 mb-[19px] "
                      accordion_heading={
                        <div className="rounded-xl font-700 dark:text-white text-black text-10 leading-3 items-center grid grid-cols-3 w-full py-[15px] px-[18px]">
                          <h2>{item.template.title}</h2>
                          <div>
                            {Object.values(JSON.parse(item.input_values))[0]}
                          </div>
                          <div className="flex justify-end  items-center gap-x-2 md:gap-x-8">
                            <p>
                              {moment(item.created_at).format("DD.MM.YYYY")}
                            </p>
                            <IconArrowDown className="w-3 h-[10px] ml-3 block" />
                          </div>
                        </div>
                      }
                      accordion_content={
                        <div className="md:py-7 py-5 dark:text-gray-100 text-black md:px-12 px-6 rounded-b-xl text-10 font-500 mb-1 leading-5">
                          {item.response}
                        </div>
                      }
                    />
                  </div>
                ))
              ) : (
                "No record found"
              )
            ) : (
              <Loader fullScreen={true} />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
