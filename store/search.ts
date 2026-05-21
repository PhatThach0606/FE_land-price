import { create } from "zustand";

type SearchType = "thuaDat" | "giaoThong" | "user";

interface SearchState {
  keywords: Record<SearchType, string>;
  triggers: Record<SearchType, number>;

  setSearch: (type: SearchType, keyword: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  keywords: {
    thuaDat: "",
    giaoThong: "",
    user: "",
  },

  triggers: {
    thuaDat: 0,
    giaoThong: 0,
    user: 0,
  },

  setSearch: (type, keyword) =>
    set((state) => ({
      keywords: {
        ...state.keywords,
        [type]: keyword,
      },

      triggers: {
        ...state.triggers,
        [type]: state.triggers[type] + 1,
      },
    })),
}));
