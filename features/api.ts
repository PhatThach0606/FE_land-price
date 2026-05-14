import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:6612/api",
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 👉 RESPONSE: handle refresh token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ❗ nếu không phải 401/403 → reject luôn
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // ❗ tránh loop refresh
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 👉 nếu đang refresh thì queue lại
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await axios.post(
        "http://localhost:6612/api/auth/refresh-token",
        {
          accessToken,
          refreshToken,
        },
      );

      const newAccessToken = res.data.accessToken || res.data.data?.accessToken;

      const newRefreshToken =
        res.data.refreshToken || res.data.data?.refreshToken;
      // 👉 lưu token mới
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      // 👉 xử lý queue
      processQueue(null, newAccessToken);

      // 👉 retry request cũ
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      originalRequest.data = originalRequest.data;

      localStorage.clear();
      window.location.href = "/login";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
