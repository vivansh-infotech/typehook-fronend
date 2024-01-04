import create from "zustand";

export const useAccordionStore = create((set) => ({
  ActiveItem: null,
  setAccordion: (payload) => {
    set({
      ActiveItem: payload,
    });
  },
}));
