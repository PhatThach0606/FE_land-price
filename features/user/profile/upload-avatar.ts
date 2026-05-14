import { api } from "@/features/api";

export const uploadAvatar = async (formData: any) => {
  try {
    const res = await api({
      method: "post",
      url: "/users/upload-avatar",
      data: formData,
    });
    return res.data.data;
  } catch (error) {}
};
