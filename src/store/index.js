import { create } from "zustand";

const useStore = create((set) => ({
  backgroundUrl: "",
  cardImageUrl: "",
  updateBackgroundUrl: (url) => set({ backgroundUrl: url }),
  updateCardImageUrl: (url) => set({ cardImageUrl: url }),
}));

export default useStore;
