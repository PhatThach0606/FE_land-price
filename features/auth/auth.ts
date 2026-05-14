import axios from "axios";

export const LoginApi = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:6612/api/auth/login",
      data: data,
    });
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};

export const RegisterApi = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:6612/api/auth/register",
      data: data,
    });
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};

export const refreshTokenApi = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:6612/api/auth/refresh-token",
      data: data,
    });
    return res.data;
  } catch (error: any) {
    console.error("API error:", error);
    throw error;
  }
};
