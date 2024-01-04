import toast from "react-hot-toast";
import { NotificationTemplate } from "./NotificationTemplate";

export const useToast = () => {
  const makeToast = (toastConfig) => {
    const options = {
      duration: toastConfig.duration ?? 3000,
      type: toastConfig.type ?? "info",
      message: toastConfig.message ?? "",
    };
    toast.custom(
      (t) => (
        <NotificationTemplate t={t} options={options}></NotificationTemplate>
      ),
      {
        duration: options.duration,
      }
    );
  };
  return makeToast;
};
