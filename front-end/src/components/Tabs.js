import React from "react";
import CurrentWeather from "./screen/CurrentWeather";
import Clinics from "./screen/Clinics";
import City from "./screen/City";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { Button, TouchableOpacity } from "react-native";
import BackButton from "./CityComponents/BackButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entry from "./screen/Entry";
import Login from "./screen/Login";
import LoginScreen from "./screen/LoginScreen";
import HomeScreen from "./screen/HomeScreen";
import SignUpScreen from "./screen/SignUpScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "darkblue",
        tabBarInactiveTintColor: "lightblue",
        // tabBarLabelStyle: {
        //   textAlign: "center",
        //   flex: 1,
        // },
        tabBarStyle: {
          backgroundColor: "#c7f2ce",
        },
        headerStyle: {
          backgroundColor: "#c7f2ce",
          height: 40,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: "black",
        },
      }}
    >
      {/* <Tab.Screen
        name={"Current"}
        component={CurrentWeather}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={"droplet"}
              size={25}
              color={focused ? "darkblue" : "lightblue"}
            />
          ),
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name={"HomeScreen"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={"droplet"}
              size={25}
              color={focused ? "darkblue" : "lightblue"}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{
          // tabBarButton: () => null,
          // tabBarIcon: ({ focused }) => (
          //   <Feather
          //     name={"droplet"}
          //     size={25}
          //     color={focused ? "darkblue" : "lightblue"}
          //   />
          // ),
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
          headerTitle: "",
        }}
      />

      <Tab.Screen
        name={"SignUpScreen"}
        component={SignUpScreen}
        options={{
          // tabBarButton: () => null,
          // tabBarIcon: ({ focused }) => (
          //   <Feather
          //     name={"droplet"}
          //     size={25}
          //     color={focused ? "darkblue" : "lightblue"}
          //   />
          // ),
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
          headerTitle: "",
        }}
      />

      <Tab.Screen
        name={"Login"}
        component={Login}
        options={{
          tabBarButton: () => null,
          tabBarIcon: ({ focused }) => (
            <Feather
              name={"droplet"}
              size={25}
              color={focused ? "darkblue" : "lightblue"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Clinics"}
        component={Clinics}
        options={{
          key: Math.random().toString(),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="clinic-medical"
              size={25}
              color={focused ? "darkblue" : "lightblue"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"City"}
        component={City}
        options={{
          key: Math.random().toString(),
          tabBarButton: () => null, // Completely hides this tab from the tab bar
          tabBarStyle: { display: "none" },
          headerTitle: "",
          // tabBarIcon: ({ focused }) => (
          //   <FontAwesome5
          //     name="clinic-medical"
          //     size={25}
          //     color={focused ? "darkblue" : "lightblue"}
          //   />
          // ),
          //headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Entry"}
        component={Entry}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
          headerTitle: "",
          //
          // tabBarIcon: ({ focused }) => (
          //   <FontAwesome5
          //     name="clinic-medical"
          //     size={25}
          //     color={focused ? "darkblue" : "lightblue"}
          //   />
          // ),
          //headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

// {
// }
