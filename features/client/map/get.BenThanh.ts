import axios from "axios";

export const getMap = async () => {
  try {
    const res = await axios.get("http://localhost:6612/api/map/ben-thanh");
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
