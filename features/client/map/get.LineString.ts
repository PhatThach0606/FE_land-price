import axios from "axios";

export const getLineString = async () => {
  try {
    const res = await axios.get("http://localhost:6612/api/map/line-string");
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
