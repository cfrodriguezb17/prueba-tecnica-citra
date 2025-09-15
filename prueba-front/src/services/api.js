import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post("/api/auth/login", credentials),
  register: (userData) => api.post("/api/auth/register", userData),
};

export const ticketsAPI = {
  create: (ticketData) => api.post("/api/solicitudes", ticketData),
  list: () => api.get("/api/solicitudes"),
  update: (id, data) => api.put(`/api/solicitudes/${id}`, data),
};

export const reportsAPI = {
  getTicketsReport: () => api.get("/api/reportes/solicitudes"),
};

export const usersAPI = {
  list: () => api.get("/api/users"),
};

export default api;
