import axios from "axios";

const API_URL = "http://localhost:6612/api/users";

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

export interface IUserQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

// GET ALL
export const getAllUser = async (params: IUserQuery) => {
  const res = await axiosClient.get("/", {
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      keyword: params.keyword || "",
    },
  });

  return res.data.data;
};

// CREATE
export const createUser = async (data: any) => {
  const res = await axiosClient.post("/create", data);
  return res.data;
};

// UPDATE
export const updateUser = async (id: number, data: any) => {
  const res = await axiosClient.patch(`/${id}`, data);
  return res.data;
};

// DELETE
export const deleteUser = async (id: number) => {
  const res = await axiosClient.delete(`/${id}`);
  return res.data;
};

// SEARCH
export const searchUser = async (keyword: string) => {
  const res = await axiosClient.get(`/search`, {
    params: { keyword },
  });
  return res.data;
};
