import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import NewPollScreen from "../src/screens/NewPollScreen";
import PollScreen from "../src/screens/PollScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ screenListeners }) => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenListeners={screenListeners}
      initialRouteName="NewPollScreen"
      screenOptions={{
        animation: "fade",
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen
          name="NewPollScreen"
          component={NewPollScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="PollScreen"
          component={PollScreen}
          options={{ gestureEnabled: false }}
        />
      </>
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
