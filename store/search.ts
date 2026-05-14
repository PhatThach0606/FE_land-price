import { create } from "zustand";

type SearchType = "thuaDat" | "giaoThong" | "user";

interface SearchState {
  keyword: string;

  trigger: number;

  setSearch: (type: SearchType, keyword: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  keyword: "",
  trigger: 0,

  setSearch: (keyword) =>
    set((state) => ({
      keyword,
      trigger: state.trigger + 1,
    })),
}));
