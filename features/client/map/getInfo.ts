import { api } from "@/features/api";

export async function getInfoLand(lat: number, lng: number) {
  try {
    const { data } = await api({
      method: "post",
      url: "/spatial/compute-position-by-coord",
      data: { lat, lng },
    });
    return data.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
}
export async function getInfoRoad(lat: number, lng: number) {
  try {
    const { data } = await api({
      method: "post",
      url: "/spatial/road-by-coord",
      data: { lat, lng },
    });
    return data.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
}
