import { API_BASE_URL } from "../config";
import type { LoginFormData, RegisterFormData } from "@/types/auth";
import type { ApiResponse, LoginResponse, RegisterResponse } from "@/types/api";

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const loginUser = async (
  data: LoginFormData
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<LoginResponse> = await response.json();

    if (!response.ok) {
      throw new AuthError(result.message || "Login failed");
    }

    // Store token in localStorage
    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
    }

    return result.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError("Network error occurred");
  }
};

export const registerUser = async (
  data: RegisterFormData
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<RegisterResponse> = await response.json();

    if (!response.ok) {
      throw new AuthError(result.message || "Registration failed");
    }

    return result.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError("Network error occurred");
  }
};
