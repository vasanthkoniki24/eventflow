import { create } from "zustand";
import { getMe, loginUser, registerUser } from "../api/auth.api";
import { tokenStorage } from "../utils/tokenStorage";

const useAuthStore = create((set) => ({
  user: null,
  token: tokenStorage.get(),
  isLoading: false,

  login: async (payload) => {
    try {
      set({ isLoading: true });
      const response = await loginUser(payload);
      const { access_token, user } = response.data;

      tokenStorage.set(access_token);

      set({
        user,
        token: access_token,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (payload) => {
    try {
      set({ isLoading: true });
      const response = await registerUser(payload);
      const { access_token, user } = response.data;

      tokenStorage.set(access_token);

      set({
        user,
        token: access_token,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  restore: async () => {
    const token = tokenStorage.get();
    if (!token) return;

    try {
      set({ isLoading: true });
      const response = await getMe();

      set({
        user: response.data,
        token,
        isLoading: false,
      });
    } catch (error) {
      tokenStorage.clear();
      set({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  },

  logout: () => {
    tokenStorage.clear();
    set({
      user: null,
      token: null,
      isLoading: false,
    });
  },
}));

export default useAuthStore;