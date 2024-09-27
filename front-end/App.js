import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigation,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Tabs from "./src/components/Tabs";
import { Button, Text } from "react-native";
import { AuthProvider, useAuth } from "./src/components/AuthContext";
import useTokenRefresh from "./src/components/useTokenRefresh";

const App = () => {
  //const { isLoggedIn } = useAuth(); // Access the logged-in status from the Auth Context

  //useTokenRefresh(); // This hook will automatically handle whether it runs or not

  return (
    <AuthProvider>
      <NavigationContainer>
        {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator> */}
        <Tabs></Tabs>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
