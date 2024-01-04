import create from "zustand";

export const useSidebarStore = create((set) => ({
  ActiveSidebar: false,
  categories: [],
  setSidebar: (payload) => {
    set({
      ActiveSidebar: payload,
    });
  },
  setCategories: (payload) => {
    set({
      categories: payload,
    });
  },
}));
