import type { LoginResponse, RegisterResponse } from "@/types/api";
import { LoginType, RegisterType } from "../validation/auth";
import axios from "axios";

export const loginUser = async (body: LoginType) => {
  try {
    const response = await axios.post(`/api/login`, body);

    return response.data as LoginResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const registerUser = async (body: RegisterType) => {
  try {
    const response = await axios.post(`/api/register`, body);

    return response.data as RegisterResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
