import React, { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthLink from "../LoginScreenComponents/AuthLink";
import AuthInput from "../LoginScreenComponents/AuthInput";

import AuthButton from "../LoginScreenComponents/AuthButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../../Auth/app";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const API_URL = "http://3.24.169.3/api";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setRegisterLogin("");
      setRegisterEmail("");
      setRegisterConfirmPassword("");
      setRegisterPassword("");
      setRegisterEmail("");
    }, []),
  );

  const validateUsername = (name) => {
    const regex = /^[a-zA-Z]{2,}$/;
    return regex.test(name);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    } else {
      try {
        const response = await api.post("/account/register", {
          username: registerLogin,
          password: registerPassword,
          email: registerEmail,
        });
        console.log(response.status);

        if (response.status === 200) {
          await AsyncStorage.setItem("access_token", response.data.access);
          await AsyncStorage.setItem("refresh_token", response.data.refresh);

          Alert.alert("Registration Successful");
          //setIsLoggedIn(true);

          const userResponse = await api.get("/account/get", {
            headers: {
              Authorization: `Bearer ${response.data.access}`, // Manually set the token
            },
          });

          await AsyncStorage.setItem("user_id", userResponse.data.public_id);
          await AsyncStorage.setItem("login_username", registerLogin);

          navigation.navigate("HomeScreen");
        }
      } catch (error) {
        Alert.alert(
          "Registration Failed",
          error.response?.data?.message || "An error occurred.",
        );
        console.error(error);
      }
    }
  };

  const handleSignUp = async () => {
    if (!validateUsername(username)) {
      Alert.alert(
        "Error",
        "Username must contain only letters and be at least 2 characters long",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/account/register`, {
        username,
        password,
      });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        await AsyncStorage.setItem("accessToken", access);
        await AsyncStorage.setItem("refreshToken", refresh);
        Alert.alert("Success", "Account created successfully");
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.code === 0
      ) {
        Alert.alert("Error", "Username already exists");
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
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
      <View style={styles.signUpContainer}>
        <Text style={styles.title}>Create Account</Text>
        <AuthInput
          placeholder="Username"
          value={registerLogin}
          onChangeText={(text) => {
            const sanitizedText = text.replace(/[^a-zA-Z]/g, "");
            setRegisterLogin(sanitizedText);
          }}
        />
        <AuthInput
          placeholder="Email"
          value={registerEmail}
          onChangeText={setRegisterEmail}
          //secureTextEntry
        />
        <AuthInput
          placeholder="Password"
          value={registerPassword}
          onChangeText={setRegisterPassword}
          secureTextEntry
        />
        <AuthInput
          placeholder="Confirm Password"
          value={registerConfirmPassword}
          onChangeText={setRegisterConfirmPassword}
          secureTextEntry
        />
        <AuthButton
          title="Sign Up"
          onPress={() => handleRegister()}
          isLoading={isLoading}
        />
        <AuthLink
          title="Already have an account? Log In"
          onPress={() => navigation.navigate("LoginScreen")}
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
  signUpContainer: {
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
  loginLink: {
    color: "#fff",
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});

export default SignUpScreen;
