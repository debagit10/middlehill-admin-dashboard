// axiosInstance.ts or api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_DEV,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${import.meta.env.BASE_URL_DEV}/api/refresh`,
          {
            token: refreshToken,
          }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        // Update the Authorization header and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle logout
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // e.g., redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
