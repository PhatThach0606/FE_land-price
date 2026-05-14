import { api } from "@/features/api";

export const getMap = async () => {
  try {
    const res = await api.get("/map/ben-thanh");
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
