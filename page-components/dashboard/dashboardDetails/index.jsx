import { ClipboardCopy } from "@/components/clipboardCopy";
import { DynamicText } from "@/components/form";
import { DynamicTextArea } from "@/components/form/DynamicTextArea";
import { FormSelect } from "@/components/form/FormSelect";
import {
  IconDownload,
  IconQuestion,
  IconTryAgain,
  IconTryAgainMobile,
} from "@/components/icon";
import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import Typewriter from "typewriter-effect";

import { useDashboardDetails } from "./useDashboardDetails";
const DashboardDetails = ({ id, formData }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    onSubmit,
    control,
    register,
    errors,
    openAiMutation,
    chatGPTData,
    requestAgain,
  } = useDashboardDetails({
    id,
    formData,
  });
  return (
    <Layout sidebar={true}>
      <div className="grid lg:grid-cols-[475px_1fr] xl:absolute top-0">
        <div className="dark:lg:bg-gray-350 bg-white lg:border-b text-16 lg:text-[13px] h-[67px] pl-12 border-r border-gray dark:bg-primary dark:border-black lg:pl-12 py-[11px] justify-start font-700 dark:text-white text-black flex items-center">
          {formData?.title}
          {formData?.media && (
            <Modal
              bodyClassName="min-w-full"
              title={t("dashboardDetails.modalTitle")}
              modalButton={<IconQuestion className=" ml-3 cursor-pointer" />}
              modalContent={
                <div
                  className="md:min-w-[768px] lg:min-w-[1024px] sm:min-w-[576px] min-w-[300px] max-w-[1024px]"
                  dangerouslySetInnerHTML={{ __html: formData?.media }}
                ></div>
              }
            />
          )}
        </div>
        <p className="text-[13px] lg:pl-12 py-[11px] xl:justify-start justify-center sm:border-b  font-700 dark:bg-gray-350 dark:text-white text-black border-gray dark:border-black hidden lg:flex items-center">
          {t("dashboardDetails.Deine_Ergebnisse_text")}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[475px_1fr] mx-auto h-[calc(100vh-48px)]">
        <div className="border-r dark:border-black border-gray dark:bg-primary bg-white">
          <div className="max-h-[calc(100vh-116px)] xl:max-h-[calc(100vh-48px)] overflow-y-auto">
            <div className="pl-[48px] pr-[34px] pb-[30px] border-b dark:border-black border-gray">
              <form
                action=""
                className="md:mt-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {formData &&
                  formData?.variables.map((form, index) => {
                    return (
                      <div key={index}>
                        {form.type_label == "Input" && (
                          <DynamicText
                            inputData={form}
                            register={register}
                            errors={errors}
                          />
                        )}
                        {form.type_label == "Textarea" && (
                          <DynamicTextArea
                            inputData={form}
                            register={register}
                            errors={errors}
                          />
                        )}
                        {form.type_label == "Option" && (
                          <div className="mb-9">
                            <label className="text-14 font-700">
                              {form.title}
                            </label>

                            <FormSelect
                              className="mt-4"
                              isMulti={false}
                              control={control}
                              options={JSON.parse(form.value).map(
                                (item, index) => {
                                  return {
                                    value: item.value,
                                    label: item.value,
                                  };
                                }
                              )}
                              name={form.slug}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                <div className="text-center">
                  <button
                    disabled={openAiMutation.isLoading}
                    className="p-3 w-full sm:w-[244px] text-[11px] shadow-main dark:shadow-c2  text-white font-700 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
                  >
                    {openAiMutation.isLoading ? (
                      <Loader />
                    ) : (
                      `${t("dashboardDetails.create_content_text")}`
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div
              id="results"
              className="dark:bg-gray-450 text-gray-50 lg:hidden block"
            >
              <div className="">
                <p className="pl-12 text-16 lg:text-[13px] border-b dark:border-black border-gray xl:pl-20 py-[11px] font-700 dark:text-white text-black text-left">
                  {t("dashboardDetails.Deine_Ergebnisse_text")}
                </p>
              </div>
              <div className="py-[10px] text-black dark:text-white font-500 text-[8px] leading-5 flex justify-end items-center border-b  dark:border-black border-gray">
                <div className="">
                  <ClipboardCopy copyText={chatGPTData} />
                </div>
                <div
                  onClick={() => requestAgain()}
                  className="flex items-center ml-7 mr-[21px] cursor-pointer"
                >
                  {`${t("dashboardDetails.try_again")}`}
                  <IconTryAgain className="w-[15px] h-[13px] ml-[11px] block" />
                </div>
              </div>
              <div
                id="new-result"
                className="typewriter py-[34px] pl-12 pr-9 text-black dark:text-white font-500 text-12 leading-5 whitespace-pre-line"
              >
                {chatGPTData && (
                  <Typewriter
                    options={{
                      strings: chatGPTData,
                      autoStart: true,
                      loop: false,
                      delay: 20,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="dark:bg-gray-450 text-gray-50 sticky top-0 mb-5">
              <div className="bg-gray-50 dark:bg-primary px-[48px] py-[30px] md:max-h-[calc(100vh-100px)] overflow-y-auto ">
                <textarea
                  className="!text-[11px] dark:text-gray text-gray-300 placeholder:text-gray dark:placeholder:text-gray-300 rounded-[10px] placeholder:text-[11px] dark:bg-white/[0.03] dark:!shadow-c2 shadow-c4 block resize-none dark:bg-gray-450 min-h-[calc(100vh-200px)] outline-none w-full px-7 py-5"
                  placeholder="Fange an zu tippen oder etwas einzufügen um loszulegen..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="dark:bg-gray-450 text-gray-50 sticky top-0">
          <div className="max-h-[calc(100vh-55px)] overflow-y-auto">
            <div className="py-[10px] text-black dark:text-white font-500 text-[8px] leading-5 flex justify-end items-center border-b  dark:border-black border-gray">
              <div className="">
                <ClipboardCopy copyText={chatGPTData} />
              </div>
              <div
                onClick={() => requestAgain()}
                className="flex items-center ml-7 mr-[21px] cursor-pointer"
              >
                {`${t("dashboardDetails.try_again")}`}
                <IconTryAgain className="w-[15px] h-[13px] ml-[11px] block" />
              </div>
            </div>
            <div
              id="new-result"
              className="typewriter py-[34px] pl-12 pr-9 text-black dark:text-white font-500 text-12 leading-5 whitespace-pre-line"
            >
              {chatGPTData && (
                <Typewriter
                  options={{
                    strings: chatGPTData,
                    autoStart: true,
                    loop: false,
                    delay: 20,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
DashboardDetails.auth = "ONLY_LOGIN_USER";
export default DashboardDetails;
