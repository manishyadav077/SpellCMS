import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const userLoginService = async ({
  email,
  password,
}: LoginCredentials) => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      {
        email: email.trim(),
        password,
      },
      { timeout: 5000 }
    );

    if (!response.data?.token) {
      throw new Error("Invalid server response");
    }

    return response.data;
  } catch (error: any) {
    // console.error("Login failed:", error.message);
    throw error;
  }
};

export const userRegisterService = async (userData: RegisterData) => {
  try {
    if (!userData.email.includes("@")) {
      throw new Error("Invalid email format");
    }

    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error("User already exists");
    }
    throw error;
  }
};
