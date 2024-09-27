import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { createAxiosInstanceWithAuth } from '../utils/tokenUtils';

const API_URL = "http://3.24.169.3/api";

const HomeScreen = () => {
  const [userData, setUserData] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const navigation = useNavigation();

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      const a = await AsyncStorage.getItem("login_username");
      setLoginUsername(a);
    }
  };

  useEffect(() => {
    // Check if the user is logged in by verifying if the access token exists in AsyncStorage
    checkLoggedIn();
  }, []);

  const fetchUserData = useCallback(async () => {
    // const axiosInstance = createAxiosInstanceWithAuth();
    // try {
    //   const response = await axiosInstance.get('/account/get');
    //   console.log('User data response:', response.data);
    //   setUserData(response.data);
    // } catch (error) {
    //   console.log('User not logged in or error fetching user data:', error);
    //   setUserData(null);
    // } finally {
    //   setIsLoading(false);
    // }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      checkLoggedIn();
    }, [fetchUserData]),
  );

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
  //     setUserData(null);
  //     Alert.alert("Success", "You have been logged out.");
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     Alert.alert(
  //       "Error",
  //       "An error occurred while logging out. Please try again.",
  //     );
  //   }
  // };

  const handleLogout = async () => {
    // Clear tokens from AsyncStorage
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("login_username");
    setIsLoggedIn(false); // Set logged in state to false
    //Alert.alert("Logout Successful");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../LoginScreenComponents/Cannect_logo_updated.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Cannect</Text>
      </View>

      {isLoggedIn ? (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome back, {loginUsername}!</Text>
          {/* <Text style={styles.infoText}>User ID: {userData.public_id}</Text>
          <Text style={styles.infoText}>
            Permission Level: {userData.permission_level}
          </Text> */}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={styles.promptText}>
            Log in to rate dispensaries and see personalized recommendations!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Explore Clinics Now!</Text>
        {/* <Text style={styles.infoText}>User ID: {userData.public_id}</Text>
          <Text style={styles.infoText}>
            Permission Level: {userData.permission_level}
          </Text> */}
        <TouchableOpacity
          style={styles.button_2}
          onPress={() => {
            navigation.navigate("Clinics");
          }}
        >
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.generalInfo}>
        <Text style={styles.sectionTitle}>About Cannect</Text>
        <Text style={styles.infoText}>
          Cannect is your go to app for finding and rating cannabis
          dispensaries. Discover new locations, share your experiences, and
          connect with the community.
        </Text>

        <Text style={styles.sectionTitle}>Featured Dispensaries</Text>
        <Text style={styles.infoText}>
          • Aleave{"\n"}• Doctor Canna{"\n"}• Grove Health
        </Text>

        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <Text style={styles.infoText}>
          • New rating system implemented{"\n"}• Added 50+ new dispensaries
          {"\n"}• Improved search functionality
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00897B",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  userInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  loginPrompt: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  promptText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  button_2: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  signUpButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText_2: {
    color: "lightblue",
    fontSize: 16,
    fontWeight: "bold",
  },
  generalInfo: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
