import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import api from "../../Auth/app";

const CurrentWeather = () => {
  const isFocused = useIsFocused();

  const [count, setCount] = useState(0);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const { saveTokens, isLoggedIn, AuthLogin, setAuthLogin, logout, getUserID } =
    useAuth();

  useEffect(() => {
    // Effect runs when the screen is focused or unfocused
    if (!isFocused) {
      // Modify state when the screen is unfocused

      setLogin("");
      setPassword("");
      setRegisterLogin("");
      setRegisterPassword("");
    }
  }, [isFocused]);

  // Function to handle the registration
  const handleRegister = async () => {
    try {
      // API endpoint
      const url = "http://192.168.1.109:4560/api/account/register";

      // Request body
      const requestBody = {
        username: registerLogin,
        password: registerPassword,
      };

      // Make the POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request header
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON
      });

      // Check if the response is OK (status 200)
      if (response.status === 200) {
        const data = await response.json();

        // Save the access and refresh tokens
        const accessToken = data.access;
        const refreshToken = data.refresh;

        saveTokens(data.access, data.refresh, registerLogin);

        // Display a success message or handle tokens as needed
        Alert.alert("Registration Successful");
        getUserID();
      } else {
        // Handle non-200 responses
        const errorData = await response.json();
        Alert.alert(
          "Registration Failed",
          errorData.message || "An error occurred.",
        );
      }
    } catch (error) {
      // Handle errors
      Alert.alert("Error", "Failed to register. Please try again later.");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    logout();
  };

  const handleLogin = async () => {
    try {
      // API endpoint
      const url = "http://192.168.1.109:4560/api/account/login";

      // Request body
      const requestBody = {
        username: login,
        password: password,
      };

      // Make the POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request header
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON
      });

      // Check if the response is OK (status 200)
      if (response.status === 200) {
        const data = await response.json();

        // Save the access and refresh tokens
        const accessToken = data.access;
        const refreshToken = data.refresh;

        await saveTokens(accessToken, refreshToken, login);

        Alert.alert("Login Successful for", login);

        await saveTokens(accessToken, refreshToken, login);
      } else {
        // Handle non-200 responses
        const errorData = await response.json();
        Alert.alert("Login Failed", errorData.message || "An error occurred.");
      }
    } catch (error) {
      // Handle errors
      Alert.alert("Error", "Failed to register. Please try again later.");
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.wrapper1}>
      <View style={styles.style1}>
        {isLoggedIn && <Text>Logged in: {AuthLogin}</Text>}
        {!isLoggedIn && <Text>Not Logged in (check: {AuthLogin})</Text>}

        {!isLoggedIn && (
          <View>
            <Text>login</Text>
            <TextInput
              style={styles.style2}
              value={login}
              onChangeText={setLogin}
              placeholder="login"
              placeholderTextColor="black"
              //multiline={true} // Enable multiline input
              // textAlignVertical="top" // Aligns text to the top
            ></TextInput>
            <Text>password</Text>
            <TextInput
              style={styles.style2}
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              placeholderTextColor="black"
              // multiline={true} // Enable multiline input
              // textAlignVertical="top" // Aligns text to the top
            ></TextInput>
            <TouchableOpacity
              style={styles.style3}
              onPress={() => {
                handleLogin();
              }}
            >
              <Text style={styles.style4}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        {isLoggedIn && (
          <View>
            <TouchableOpacity
              style={styles.style3}
              onPress={() => {
                handleLogout();
              }}
            >
              <Text style={styles.style4}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoggedIn && (
          <View>
            <Text>Register login</Text>
            <TextInput
              style={styles.style2}
              value={registerLogin}
              onChangeText={setRegisterLogin}
              placeholder="register login"
              placeholderTextColor="black"
              //multiline={true} // Enable multiline input
              // textAlignVertical="top" // Aligns text to the top
            ></TextInput>
            <Text>Register password</Text>
            <TextInput
              style={styles.style2}
              value={registerPassword}
              onChangeText={setRegisterPassword}
              placeholder="register password"
              placeholderTextColor="black"
              // multiline={true} // Enable multiline input
              // textAlignVertical="top" // Aligns text to the top
            ></TextInput>
            <TouchableOpacity
              style={styles.style3}
              onPress={() => {
                handleRegister();
              }}
            >
              <Text style={styles.style4}>register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  style1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  style2: {
    backgroundColor: "white",
    width: 250,
  },
  style3: { alignItems: "center" },
  style4: {
    fontSize: 20,
    backgroundColor: "lightgrey",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "grey",
    marginTop: 20,
    marginBottom: 60,
  },

  wrapper1: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
export default CurrentWeather;
