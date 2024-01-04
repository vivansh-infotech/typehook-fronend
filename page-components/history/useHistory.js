import { useToast } from "@/components/notification";
import { TEMPLATES } from "@/services";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const useHistory = () => {
  const [history, setHistory] = useState(null);
  const makeToast = useToast();
  const { t } = useTranslation();

  const historyMutation = useMutation({
    mutationFn: TEMPLATES.history,
    onSuccess: (data) => {
      setHistory(data?.data);
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.wrong")}`,
      });
    },
  });

  useEffect(() => {
    historyMutation.mutate();
  }, []);
  return {
    historyMutation,
    history,
  };
};

export default useHistory;
