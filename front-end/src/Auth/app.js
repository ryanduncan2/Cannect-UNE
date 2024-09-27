import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://3.24.169.3/api/", // Update to your new base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const IsLoggedIn = async () => {
  const token = await AsyncStorage.getItem("access_token");
  //console.log("are we logged in ? :", !!token);
  return !!token; // Return true if token exists, false otherwise
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("user_id");
    //console.log("in app.js, userID is : ", userId);
    return userId;
  } catch (error) {
    console.error("Error fetching userId:", error);
    return null;
  }
};

// Request interceptor for adding the access token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await api.post("/account/refresh", {
            refresh: refreshToken,
          });

          //const { access_token } = response.data;
          await AsyncStorage.setItem("access_token", response.data.access);

          api.defaults.headers.common["Authorization"] =
            `Bearer ${response.data.access}`;
          originalRequest.headers["Authorization"] =
            `Bearer ${response.data.access}`;

          return api(originalRequest); // Retry the original request
        } catch (err) {
          console.error("Token refresh failed", err);
        }
      }
    } else {
      console.log("error wasn't 401: ", error.response.status);

      console.log("error wasn't 401: ", error.response);

      console.log("error wasn't 401: ", error);
    }

    return Promise.reject(error);
  },
);

export default api;
