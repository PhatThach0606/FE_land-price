import { api } from "@/features/api";

export const getProfile = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
