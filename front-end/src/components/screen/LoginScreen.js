import React, { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../Auth/app";

import AuthLink from "../LoginScreenComponents/AuthLink";
import AuthInput from "../LoginScreenComponents/AuthInput";

import AuthButton from "../LoginScreenComponents/AuthButton";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
//import AuthLink from "../components/LoginScreenComponents/AuthLink";

const API_URL = "http://3.24.169.3/api";

const LoginScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setLogin("");
      setPassword("");
    }, []),
  );

  const handleLogin = async () => {
    try {
      const response = await api.post("/account/login", {
        username: login,
        password: password,
      });

      console.log(response.status);
      if (response.status === 200) {
        await AsyncStorage.setItem("access_token", response.data.access);
        await AsyncStorage.setItem("refresh_token", response.data.refresh);

        Alert.alert("Login Successful");
        setIsLoggedIn(true);

        const userResponse = await api.get("/account/get", {
          headers: {
            Authorization: `Bearer ${response.data.access}`, // Manually set the token
          },
        });

        await AsyncStorage.setItem("user_id", userResponse.data.public_id);
        await AsyncStorage.setItem("login_username", login);
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred.",
      );
      //console.error(error);
    }
    // setIsLoading(true);
    // try {
    //   const response = await axios.post(`${API_URL}/account/login`, {
    //     username,
    //     password,
    //   });
    //   if (response.status === 200) {
    //     const { access, refresh } = response.data;
    //     await AsyncStorage.setItem("accessToken", access);
    //     await AsyncStorage.setItem("refreshToken", refresh);
    //     Alert.alert("Success", "Logged in successfully");
    //     navigation.navigate("Home");
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     switch (error.response.status) {
    //       case 400:
    //         switch (error.response.data.code) {
    //           case 0:
    //             Alert.alert("Error", "Username is required");
    //             break;
    //           case 1:
    //             Alert.alert("Error", "Password is required");
    //             break;
    //           case 2:
    //             Alert.alert("Error", "Account does not exist");
    //             break;
    //           case 3:
    //             Alert.alert("Error", "Incorrect password");
    //             break;
    //           default:
    //             Alert.alert("Error", "An unexpected error occurred");
    //         }
    //         break;
    //       default:
    //         Alert.alert("Error", "An unexpected error occurred");
    //     }
    //   } else {
    //     Alert.alert("Error", "Network error. Please try again.");
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../LoginScreenComponents/Cannect_logo_updated.png")}
        style={styles.Image}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
        title="Back"
        style={styles.myButton}
      >
        <AntDesign name="arrowleft" size={34} color="black" />
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome Back</Text>

        <AuthInput
          placeholder="Username"
          value={login}
          onChangeText={setLogin}
        />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AuthButton
          title="Log In"
          onPress={handleLogin}
          isLoading={isLoading}
        />
        <AuthLink
          title="Forgot Password?"
          onPress={() => {
            /* Handle forgot password */
          }}
        />
        <AuthLink
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myButton: {
    backgroundColor: "lightblue",
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00897B",
  },
  loginContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  Image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#00897B",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#fff",
    marginTop: 15,
  },
  signUpLink: {
    color: "#fff",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});

export default LoginScreen;
