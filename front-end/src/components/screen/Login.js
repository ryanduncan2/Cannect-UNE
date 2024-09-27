import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Auth/app"; // Your Axios instance with new baseURL

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying if the access token exists in AsyncStorage
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkLoggedIn();
  }, []);

  // Handle registration
  const handleRegister = async () => {
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

        //Alert.alert("Registration Successful");
        setIsLoggedIn(true);
      }
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "An error occurred.",
      );
      console.error(error);
    }
  };

  // Handle login
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

        //Alert.alert("Login Successful");
        setIsLoggedIn(true);

        const userResponse = await api.get("/account/get", {
          headers: {
            Authorization: `Bearer ${response.data.access}`, // Manually set the token
          },
        });

        await AsyncStorage.setItem("user_id", userResponse.data.public_id);
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "An error occurred.",
      );
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    // Clear tokens from AsyncStorage
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("user_id");
    setIsLoggedIn(false); // Set logged in state to false
    //Alert.alert("Logout Successful");
  };

  return (
    <ScrollView style={styles.wrapper1}>
      <View style={styles.style1}>
        {isLoggedIn ? <Text>Logged in</Text> : <Text>Not Logged in</Text>}

        {!isLoggedIn && (
          <View>
            <Text>Login</Text>
            <TextInput
              style={styles.style2}
              value={login}
              onChangeText={setLogin}
              placeholder="Login"
              placeholderTextColor="black"
            />
            <Text>Password</Text>
            <TextInput
              style={styles.style2}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="black"
            />

            <TouchableOpacity style={styles.style3} onPress={handleLogin}>
              <Text style={styles.style4}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        {isLoggedIn && (
          <View>
            <TouchableOpacity style={styles.style3} onPress={handleLogout}>
              <Text style={styles.style4}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoggedIn && (
          <View>
            <Text>Register</Text>
            <TextInput
              style={styles.style2}
              value={registerLogin}
              onChangeText={setRegisterLogin}
              placeholder="Register Login"
              placeholderTextColor="black"
            />
            <Text>Password</Text>
            <TextInput
              style={styles.style2}
              value={registerPassword}
              onChangeText={setRegisterPassword}
              placeholder="Register Password"
              secureTextEntry
              placeholderTextColor="black"
            />
            <Text>Email</Text>
            <TextInput
              style={styles.style2}
              value={registerEmail}
              onChangeText={setRegisterEmail}
              placeholder="Email"
              placeholderTextColor="black"
            />
            <TouchableOpacity style={styles.style3} onPress={handleRegister}>
              <Text style={styles.style4}>Register</Text>
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

export default Login;
