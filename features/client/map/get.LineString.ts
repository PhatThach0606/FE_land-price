import { api } from "@/features/api";

export const getLineString = async () => {
  try {
    const res = await api.get("/map/line-string");
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
