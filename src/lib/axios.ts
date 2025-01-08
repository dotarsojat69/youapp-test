import axios from "axios";
import { toast } from "@/hooks/use-toast";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Interceptor request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      // Tambahkan cookie
      document.cookie = `next-auth.token=${token}; path=/; SameSite=Strict`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tangani error autentikasi
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Hapus token dari localStorage dan cookie
      localStorage.removeItem("token");
      document.cookie =
        "next-auth.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Tampilkan pesan
      toast({
        title: "Session Expired",
        description: "Please login again",
        variant: "destructive",
      });

      // Redirect ke login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
