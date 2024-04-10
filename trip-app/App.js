// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "store";
import Nav from "@components/Nav/Nav";
import Login from "@views/login/login";
import { getToken } from "@/utils/auth";

const Stack = createNativeStackNavigator();
const token = getToken();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>{token ? <Nav /> : <Login />}</NavigationContainer>
    </Provider>
  );
}

export default App;
