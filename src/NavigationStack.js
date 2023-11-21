import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenData } from "./ScreenData";
import { AuthContext } from "./context/auth/Auth.context";

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn)
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "HomePage" : "Welcome"}>
      {screenData.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            title: screen.name,
            headerShown: false,
            presentation: "modal",
          }}
        />
      ))}
    </Stack.Navigator>
  );
};
