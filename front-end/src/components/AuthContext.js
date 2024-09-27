// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to access Auth Context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [AuthLogin, setAuthLogin] = useState("");
  const [userID, setUserID] = useState(null);

  // Derive isLoggedIn state based on the presence of accessToken
  let isLoggedIn = !!accessToken;

  // Function to save tokens to both state and AsyncStorage
  const saveTokens = async (access, refresh, login) => {
    try {
      setAccessToken(access);
      setRefreshToken(refresh);
      setAuthLogin(login);

      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken", refresh);
      await AsyncStorage.setItem("AuthLogin", login);

      return { access };
    } catch (error) {
      console.error("Failed to save tokens:", error);
    }
  };

  // Function to load tokens from AsyncStorage when the app starts
  const loadTokens = async (a) => {
    try {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      const storedAuthLogin = await AsyncStorage.getItem("AuthLogin");

      if (storedAccessToken && storedRefreshToken && storedAuthLogin) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setAuthLogin(storedAuthLogin);
      } else {
        console.log("nothing to load in Authcontext loadTokens");
      }
    } catch (error) {
      console.error("Failed to load tokens from AsyncStorage:", error);
    }
  };

  // Function to clear tokens on logout
  const logout = async () => {
    try {
      setAccessToken(null);
      setRefreshToken(null);
      setAuthLogin("");
      setUserID(0);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("AuthLogin");
      console.log("in logout:", accessToken, refreshToken, AuthLogin);
    } catch (error) {
      console.error("Failed to clear tokens on logout:", error);
    }
  };

  const getUserID = async () => {
    try {
      if (!isLoggedIn) {
        console.log(
          "in AuthContext, in getUserID still not logged in returning",
        );
        return;
      } else {
        console.log("in AuthContext, in getUserID loggedIn ... but...");
      }

      const url = "http://192.168.1.109:4560/api/account/get";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status == 401) {
        const newAccessToken = await refreshAuthToken();
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }

      if (!response.ok) {
        console.log("in AuthContext.js status not 200 for getUserId");
        console.log(response.status);
        console.log(response);
        return;
      }

      const data = await response.json();
      setUserID(data.public_id);
      console.log(
        "in AuthContext, in getUserID success got userID, for: ",
        AuthLogin,
      );
    } catch (error) {
      console.error("failed to get a user Id from server:", error);
    }
  };

  // Function to reload access tokens.
  const refreshAuthToken = async () => {
    try {
      if (!refreshToken || !AuthLogin) {
        // Log if refresh token or AuthLogin is missing
        console.log("AuthContext error refreshtoken: ", refreshToken, "\n\n");
        console.log("AuthContext error authlogin: ", AuthLogin);
        logout();
        return;
      } else {
        // console.log(
        //   "AuthContext both refreshtoken and authlogin non-null: ",
        //   refreshToken,
        //   AuthLogin,
        // );
      }

      // Call backend API to refresh the token using fetch
      const response = await fetch(
        "http://192.168.1.109:4560/api/account/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: AuthLogin,
            refresh: refreshToken,
          }),
        },
      );

      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text(); // Get response text for error details
        console.log("     Response is not okay:", {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("authcontext.js refresh       RESPONSE IS GOOD!");
      }

      // Parse the JSON response
      const data = await response.json();
      //console.log("       Refresh token response:", data); // Log the response to inspect its format

      // Extract the new access token from the response
      const { access: newAccessToken } = data;

      // Save new tokens to state and AsyncStorage
      await saveTokens(newAccessToken, refreshToken, AuthLogin);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout(); // Log out the user if refresh fails
    }
  };

  // Use useEffect to load tokens when the component mounts
  useEffect(() => {
    const initializeAuth = async () => {
      await loadTokens(); // Wait for loadTokens to complete
      //refreshAuthToken(); // Run refreshAuthToken immediately after loadTokens finishes
    };
    initializeAuth();
    // console.log(
    //   "in AuthContect.js loadtokens: ",
    //   accessToken,
    //   refreshToken,
    //   AuthLogin,
    // );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        saveTokens,
        isLoggedIn,
        AuthLogin,
        setAuthLogin,
        logout, // Export the logout function
        refreshAuthToken,
        getUserID,
        userID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
