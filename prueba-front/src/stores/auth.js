import { defineStore } from "pinia";
import { authAPI } from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  getters: {
    isClient: (state) => state.user?.role_id === 1,
    isSupport: (state) => state.user?.role_id === 2,
    isAdmin: (state) => state.user?.role_id === 3,
    userRole: (state) => {
      switch (state.user?.role_id) {
        case 1:
          return "Client";
        case 2:
          return "Support";
        case 3:
          return "Admin";
        default:
          return "Unknown";
      }
    },
  },

  actions: {
    async login(credentials) {
      try {
        const response = await authAPI.login(credentials);
        const { user, token } = response.data;

        this.user = user;
        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Login failed",
        };
      }
    },

    async register(userData) {
      try {
        const response = await authAPI.register(userData);
        const { user, token } = response.data;

        this.user = user;
        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Registration failed",
        };
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    initializeAuth() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    },
  },
});
