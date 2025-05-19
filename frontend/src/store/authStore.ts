import { create } from "zustand";
import { userLoginService, userRegisterService } from "../services/authService";

interface AuthState {
  user: any;
  token: string | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  login: async (payload) => {
    const data = await userLoginService(payload);
    // console.log("login data", data)
    set({ user: data.user, token: data.token });
    localStorage.setItem("token", data.token);
  },

  register: async (payload) => {
    const data = await userRegisterService(payload);
    // console.log(data)
    set({ user: data.user, token: data.token });
    localStorage.setItem("token", data.token);
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
