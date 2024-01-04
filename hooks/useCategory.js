import { useToast } from "@/components/notification";
import { TEMPLATES } from "@/services";
import { useSidebarStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

const useCategory = () => {
  const makeToast = useToast();
  const setSidebarCategories = useSidebarStore((state) => state.setCategories);
  const categoriesMutation = useMutation({
    mutationFn: TEMPLATES.categories,
    onSuccess: (data) => {
      setSidebarCategories(data?.data);
    },
    onError: (error) => {
      makeToast({
        type: "error",
        message: `${t("error.dashboardSidebar")}`,
      });
    },
  });
  return { categoriesMutation };
};

export default useCategory;
