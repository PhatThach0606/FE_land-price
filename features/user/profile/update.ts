import { api } from "@/features/api";

export const updateProfile = async (data: any) => {
  try {
    const res = await api({
      method: "patch",
      url: "/users/me",
      data: data,
    });
    return res.data.data;
  } catch (error) {}
};
