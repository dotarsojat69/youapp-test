import { LoginResponse, RegisterResponse } from "@/types/api";
import { LoginType, RegisterType } from "../validation/auth";
import api from "../axios";

export const loginUser = async (body: LoginType) => {
  try {
    const response = await api.post(`/api/login`, body);
    return response.data as LoginResponse;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (body: RegisterType) => {
  try {
    console.log("Register Request Body:", body); // Log body sebelum request

    const response = await api.post(`/api/register`, body);

    console.log("Register Response:", response.data); // Log response
    return response.data as RegisterResponse;
  } catch (error: any) {
    console.error("Register Error:", error); // Log error detail

    // Tangani berbagai tipe error
    if (error.response) {
      // Server responded with an error
      console.error("Server Error Response:", error.response.data);
      throw new Error(error.response.data?.message || "Registration failed");
    } else if (error.request) {
      // Request was made but no response received
      console.error("No Response Received:", error.request);
      throw new Error(
        "No response from server. Check your network connection."
      );
    } else {
      // Something happened in setting up the request
      console.error("Request Setup Error:", error.message);
      throw new Error("Error setting up request");
    }
  }
};
