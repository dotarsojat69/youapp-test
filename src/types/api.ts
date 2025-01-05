import { ReactNode } from "react";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface LoginResponse {
  message: ReactNode;
  data: any;
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface RegisterResponse {
  message: ReactNode;
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface Profile {
  name: string;
  gender: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
}
