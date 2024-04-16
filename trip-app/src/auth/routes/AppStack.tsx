import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Nav from "@/components/Nav";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TripShine" component={Nav} />
    </Stack.Navigator>
  );
};
