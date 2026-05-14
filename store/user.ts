import { create } from "zustand";
type User = {
  full_name: string;
  email: string;
  role?: string;
  avatar?: string | null;
  phone?: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : state.user,
    })),
}));
