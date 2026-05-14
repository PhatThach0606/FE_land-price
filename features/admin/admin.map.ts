import axios from "axios";

const API_URL = "http://localhost:6612/api/map";

const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export interface IMapQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
}
export const getAllThuaDat = async (params: IMapQuery) => {
  const res = await axiosClient.get("/thua-dat", {
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 100,
      keyword: params.keyword || "",
    },
  });

  return res.data.data;
};
export const updateThuaDat = async (id: number, data: any) => {
  const res = await axiosClient.patch(`/thua-dat/${id}`, data);
  return res.data;
};
export const getAllGiaoThong = async (params: IMapQuery) => {
  const res = await axiosClient.get("/giao-thong", {
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      keyword: params.keyword || "",
    },
  });

  return res.data.data;
};
export const updateGiaoThong = async (id: number, data: any) => {
  const res = await axiosClient.patch(`/giao-thong/${id}`, data);
  return res.data;
};
