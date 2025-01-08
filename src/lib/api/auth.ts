import { RegisterResponse, ResponseLogin } from "@/types/api";
import { LoginType, RegisterType } from "../validation/auth";
import api from "../axios";

export const loginUser = async (body: LoginType) => {
  try {
    const response = await api.post(`/api/login`, {
      username: body.loginIdentifier,
      password: body.password,
    });

    // Pastikan response memiliki token
    if (!response.data.token) {
      throw new Error("No token received");
    }

    return response.data as ResponseLogin;
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

    // menangani berbagai tipe error
    if (error.response) {
      console.error("Server Error Response:", error.response.data);
      throw new Error(error.response.data?.message || "Registration failed");
    } else if (error.request) {
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
