import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NavigationStack } from "./src/NavigationStack";
import { UserProvider } from "./src/context/user/User.provider";
import { AuthProvider } from "./src/context/auth/Auth.provider";

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <NavigationStack />
        </NavigationContainer>
      </AuthProvider>
    </UserProvider>
  );
}
