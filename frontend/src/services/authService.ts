import axios from "axios";
import axiosInstance from "../utils/axiosInstance";


export const userLoginService = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/login", payload);
  // console.log(response)
  return response.data;
};

export const userRegisterService = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/register", payload);
  // console.log(response)
  return response.data;
};
