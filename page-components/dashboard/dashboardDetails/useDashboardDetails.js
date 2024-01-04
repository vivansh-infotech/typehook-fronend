import { useToast } from "@/components/notification";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TEMPLATES } from "@/services";
import { useUserStore } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import * as yup from "yup";
export const useDashboardDetails = ({ id, formData }) => {
  const setTotalRequestPurchase = useUserStore(
    (state) => state.setTotalRequest
  );

  const setRequestRemain = useUserStore((state) => state.setRequestLeft);
  const isResponsive = useMediaQuery("(max-width: 1024px)");
  const makeToast = useToast();
  const { t } = useTranslation();
  const [oldFormData, setOldFormData] = useState(null);

  const [chatGPTData, setChatGPTData] = useState(null);

  const getTextAreaSchema = () => {
    return yup
      .string()
      .required(`${t("error.input")}`)
      .min(0)
      .max(4000, "This field has a maximum limit of 4000 characters");
  };

  const getInputSchema = () => {
    return yup.string().required(`${t("error.input")}`);
  };

  const getOptionSchema = () => {
    return yup.string().required(`${t("error.input")}`);
  };

  const generateFormSchema = () => {
    let formSchema = {};
    formData.variables.map((item) => {
      if (item.type_label === "Option") {
        formSchema[item.slug] = getOptionSchema();
      }
      if (item.type_label === "Input") {
        formSchema[item.slug] = getInputSchema();
      }
      if (item.type_label === "Textarea") {
        formSchema[item.slug] = getTextAreaSchema();
      }
    });
    return formSchema;
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(yup.object().shape(generateFormSchema()))
  });

  const openAiMutation = useMutation({
    mutationFn: TEMPLATES.openAi,
    onSuccess: (data) => {
      makeToast({
        type: "success",
        message: `${t("success.dashboardDetails")}`
      });
      setChatGPTData(data?.text);
      setRequestRemain(data?.request_left);
      setTotalRequestPurchase(data?.total_request);
      isResponsive && scrollTo();
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.dashboardDetails")}`
      });
    }
  });

  const onSubmit = async (data) => {
    let userData = { ...data };
    userData.template_id = id;
    setChatGPTData(null);

    openAiMutation.mutate(userData);
    setOldFormData(userData);
  };
  const requestAgain = () => {
    setChatGPTData(null);

    oldFormData && openAiMutation.mutate(oldFormData);
  };
  const scrollTo = () => {
    setTimeout(() => {
      const element = document.getElementById("results");
      element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  useEffect(() => {
    reset();
    setOldFormData(null);
    setChatGPTData(null);
  }, [id]);
  return {
    requestAgain,
    handleSubmit,
    onSubmit,
    control,
    register,
    errors,
    openAiMutation,
    chatGPTData
  };
};
