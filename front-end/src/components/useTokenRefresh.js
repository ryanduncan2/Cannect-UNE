// useTokenRefresh.js
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Import your Auth context or relevant context provider
import jwt_decode from "jwt-decode"; // Make sure to install jwt-decode

const useTokenRefresh = () => {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isLoggedIn,
  } = useAuth(); // Assuming these are defined in your AuthContext
  const [expiryTime, setExpiryTime] = useState(null);

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      // Decode the JWT to get the expiry time
      const decodedToken = jwt_decode(accessToken);
      setExpiryTime(decodedToken.exp * 1000); // Convert expiration time to milliseconds
    }
  }, [accessToken]);

  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://example.com/api/token/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken); // Optionally update the refresh token if a new one is issued
        // Update expiry time based on new access token
        const decodedToken = jwt_decode(data.accessToken);
        setExpiryTime(decodedToken.exp * 1000);
      } else {
        console.error("Token refresh failed");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && expiryTime) {
      // Refresh token 5 minutes before it expires
      const refreshInterval = setInterval(
        () => {
          refreshAccessToken();
        },
        expiryTime - Date.now() - 5 * 60 * 1000,
      ); // Refresh 5 minutes before expiry

      return () => clearInterval(refreshInterval);
    }
  }, [expiryTime, refreshToken, isLoggedIn]);

  return { refreshAccessToken };
};

export default useTokenRefresh;
