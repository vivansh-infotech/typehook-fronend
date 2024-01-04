import { DynamicText } from "@/components/form";
import { DynamicTextArea } from "@/components/form/DynamicTextArea";
import { FormSelect } from "@/components/form/FormSelect";
import {
  IconAllDownload,
  IconDownload,
  IconQuestion,
  IconTryAgain,
  IconTryAgainMobile,
} from "@/components/icon";
import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useState } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Typewriter from "typewriter-effect";
import { useImageGenerateDetails } from "./useImageGenerateDetails";

const ImageDetails = ({ id, formData }) => {
  const [textClear, setTextClear] = useState("");

  const { t } = useTranslation();
  const {
    handleSubmit,
    onSubmit,
    control,
    register,
    image,
    errors,
    openAiMutation,
    chatGPTData,
    download,
    multipleImageDownload,
    requestAgain,
    searchHistory,
  } = useImageGenerateDetails({
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
                  formData?.variables.map((form, index) => (
                    <div key={`form-data-${index}`}>
                      {form.type_label == "Input" && (
                        <DynamicText
                          inputData={form}
                          register={register}
                          errors={errors}
                        />
                      )}
                      {form.type_label == "Textarea" && (
                        <DynamicTextArea
                          value={textClear}
                          inputData={form}
                          register={register}
                          errors={errors}
                          id="textClear"
                          name="textClear"
                        />
                      )}
                      {form.type_label == "Option" && (
                        <div className="mb-9">
                          <label className="text-14 font-700 ">
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
                  ))}
                <div className="mt-4 mb-8">
                  <label htmlFor="" className="text-14 font-700">
                    {t("dashboardDetails.Anzahl Bilder")}
                  </label>
                  <input
                    name="no_of_image"
                    {...register(t("no_of_image"))}
                    id=""
                    className="mt-4 webkit-appearance-none h-[42px] !text-[11px] dark:text-gray text-gray-300 placeholder:!text-[11px] placeholder:text-gray dark:placeholder:text-gray-300 bg-white/[0.03] w-full shadow-c4 relative z-10 outline-none rounded-[10px] px-8 py-4 "
                    type="number"
                    placeholder=".."
                  />
                  {errors.no_of_image && (
                    <p className="text-red-400 mt-2  p-0 text-14">
                      {errors.no_of_image.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center gap-x-[27px]">
                  <button
                    type="reset"
                    onClick={() => setTextClear("")}
                    className="p-3 w-full sm:w-[244px] text-[11px] shadow-main dark:shadow-c2  text-[#777777] font-700 bg-[#F3F4F5] rounded-full"
                  >
                    {t("dashboardDetails.Input zurücksetzen")}
                  </button>

                  <button
                    disabled={openAiMutation.isLoading}
                    className="p-3 w-full sm:w-[244px] text-[11px] shadow-main dark:shadow-c2  text-white font-700 bg-gradient-to-r from-[#69A7E3] to-[#555BA5] rounded-full"
                  >
                    {openAiMutation.isLoading ? (
                      <Loader />
                    ) : (
                      `${t("dashboardDetails.Bilder erstellen")}`
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
                <button
                  onClick={() => multipleImageDownload()}
                  className="mobile flex items-center cursor-pointer text-8 font-500 dark:text-white text-dark"
                >
                  {t("clipboardCopy.Alle_herunterladen")}
                  <IconAllDownload className="text-black dark:text-white w-3 h-[14px] ml-[11px]" />
                </button>

                <div
                  onClick={() => requestAgain()}
                  className="flex items-center ml-7 mr-[21px] cursor-pointer"
                >
                  <span> {`${t("dashboardDetails.try_again")}`}</span>
                  <IconTryAgainMobile className="w-[15px] h-[13px] ml-[11px] block" />
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
                <div className="grid grid-cols-2 gap-[26px] mobile">
                  {image && Array.isArray(image) && image.length >= 0
                    ? image.map((item, index) => (
                        <div key={`images-${index}`} className="relative">
                          <div
                            onClick={(event) => {
                              event.preventDefault();
                              download(`data:image/jpeg;base64,${item}`);
                            }}
                          >
                            <div className="absolute bg-white pt-[7px] px-2 pb-[6px] rounded-full top-4 right-2 0">
                              <IconDownload className="w-2 h-[11px] text-black dark:text-white" />
                            </div>
                          </div>
                          <Modal
                            modalButton={
                              <div className="group overflow-hidden pt-3">
                                <img
                                  src={`data:image/jpeg;base64,${item}`}
                                  alt={`Image ${index}`}
                                  className=" "
                                />
                              </div>
                            }
                            modalContent={
                              <div className="relative">
                                <div
                                  onClick={(event) => {
                                    event.preventDefault();
                                    download(`data:image/jpeg;base64,${item}`);
                                  }}
                                >
                                  <div className="absolute bg-white pt-[7px] px-2 pb-[6px] rounded-full top-6 right-[10px] ">
                                    <IconDownload className="w-2 h-[11px] text-black dark:text-white" />
                                  </div>
                                </div>
                                <img
                                  src={`data:image/jpeg;base64,${item}`}
                                  alt={`Image ${index}`}
                                  className="max-h-[90vh]  pt-3 "
                                />
                              </div>
                            }
                          />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>

            <div className="dark:bg-gray-450 text-gray-50 sticky top-0 mb-5">
              <div className="bg-gray-50 dark:bg-primary px-[48px] py-[30px] md:max-h-[calc(100vh-100px)] overflow-y-auto ">
                <div>
                  <h4 className="text-12 font-700 text-black dark:text-white mb-4">
                    {t("images.Deine_letzten_Ergebnisse")}
                  </h4>
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                  <div className="shadow-c4 bg-white/[0.03] dark:bg-primary py-3 pl-4 rounded-[10px] relative ">
                    <Swiper
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      spaceBetween={21}
                      freeMode={true}
                      modules={[Navigation]}
                      className="mySwiper relative"
                      slidesPerView={3}
                    >
                      {searchHistory &&
                        Array.isArray(searchHistory) &&
                        searchHistory?.map((item, index) => (
                          <SwiperSlide key={`images-slider-${index}`}>
                            <img
                              src={`data:image/jpeg;base64,${item}`}
                              alt={`Image ${index}`}
                              className="transform-gpu transition-transform duration-300 group-hover:scale-110"
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dark:bg-gray-450 text-gray-50 sticky top-0 lg:block hidden">
          <div className="max-h-[calc(100vh-55px)] overflow-y-auto">
            <div className="py-[10px] text-black dark:text-white font-500 text-[8px] leading-5 flex justify-end items-center border-b  dark:border-black border-gray">
              <button
                onClick={() => multipleImageDownload()}
                className="desktop flex items-center cursor-pointer text-8 font-500 dark:text-white text-dark"
              >
                {t("clipboardCopy.Alle_herunterladen")}
                <IconAllDownload className="text-black dark:text-white w-3 h-[14px] ml-[11px]" />
              </button>

              <div
                onClick={() => requestAgain()}
                className="flex items-center ml-7 mr-[21px] cursor-pointer"
              >
                <span> {`${t("dashboardDetails.try_again")}`}</span>
                <IconTryAgain className="w-[15px] h-[13px] ml-[11px] block " />
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
              <div className="grid grid-cols-2 gap-[26px] desktop">
                {image && Array.isArray(image) && image.length >= 0
                  ? image.map((item, index) => (
                      <div
                        key={`new-image-desktop-${index}`}
                        className="relative group"
                      >
                        <Link
                          href={""}
                          onClick={(event) => {
                            event.preventDefault();
                            download(`data:image/jpeg;base64,${item}`);
                          }}
                        >
                          <div className="absolute bg-white pt-[7px] px-2 pb-[6px] rounded-full top-2 right-[10px] z-10 opacity-0 group-hover:opacity-100">
                            <IconDownload className="w-2 h-[11px] text-black dark:text-white" />
                          </div>
                        </Link>
                        <Modal
                          modalButton={
                            <div className="group overflow-hidden pt-3">
                              <img
                                src={`data:image/jpeg;base64,${item}`}
                                alt={`Image ${index}`}
                                className=" transform-gpu transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          }
                          modalContent={
                            <>
                              <div>
                                <Link
                                  href={""}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    download(`data:image/jpeg;base64,${item}`);
                                  }}
                                >
                                  <div className="absolute bg-white pt-[7px] px-2 pb-[6px] rounded-full top-16 right-10">
                                    <IconDownload className="w-2 h-[11px] text-black dark:text-white" />
                                  </div>
                                </Link>
                              </div>
                              <div className="overflow-hidden pt-3">
                                <img
                                  src={`data:image/jpeg;base64,${item}`}
                                  alt={`Image ${index}`}
                                  className="max-h-[90vh] pt-3 "
                                />
                              </div>
                            </>
                          }
                        />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
ImageDetails.auth = "ONLY_LOGIN_USER";
export default ImageDetails;
