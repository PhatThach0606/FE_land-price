import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:6612/api/ai";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Thêm timeout 10s cho chắc
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- PHẦN BẮT LỖI TẬP TRUNG ---
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Ní có thể dùng toast.error hoặc alert ở đây để báo lỗi nhanh
    const message =
      (error.response?.data as any)?.message || "Đã có lỗi xảy ra!";
    console.error("API Error:", message);

    // Ví dụ: Nếu 401 thì đá về login
    if (error.response?.status === 401) {
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

// 2. Hỏi AI
export async function askAI(question: string) {
  try {
    const res = await axiosClient.post("/ask", { question });
    console.log(res);
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

// 3. Upload file
export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
