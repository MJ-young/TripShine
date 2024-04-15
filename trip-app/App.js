import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux"; // 为了避免命名冲突，将 Redux 的 Provider 重命名为 ReduxProvider
import { Provider as PaperProvider } from "react-native-paper"; // 引入 React Native Paper 的 Provider
import store from "@/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Nav from "@/components/Nav";
import Login from "@/views/login";
import { navigationRef } from "@/utils/NavigationService";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={Nav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
