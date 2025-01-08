import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000, // Naikkan timeout
  withCredentials: false,

  // Tambahkan konfigurasi untuk mengatasi preflight
  proxy: {
    host: "localhost",
    port: 3000,
  },
});

// Interceptor request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
    config.headers["Access-Control-Allow-Methods"] =
      "GET,PUT,POST,DELETE,OPTIONS";
    config.headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization";

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Interceptor Detailed Error:", {
      error: error,
      response: error.response,
      request: error.request,
      config: error.config,
    });

    if (axios.isCancel(error)) {
      throw new Error("Request canceled");
    }

    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout");
    }

    if (error.response) {
      // Server responded with an error status
      console.error("Server Error Response:", error.response.data);
      throw new Error(error.response.data?.message || "Server error occurred");
    } else if (error.request) {
      // Request was made but no response received
      console.error("No Response Received:", error.request);
      throw new Error("No response from server. Check network connection.");
    } else {
      // Something happened in setting up the request
      console.error("Request Setup Error:", error.message);
      throw new Error("Error preparing request");
    }
  }
);

export default api;
