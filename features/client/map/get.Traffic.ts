import { api } from "@/features/api";

export const getTraffic = async () => {
  try {
    const res = await api.get("/map/traffic");
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
