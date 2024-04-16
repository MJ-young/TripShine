import React from "react";
import { Provider as ReduxProvider } from "react-redux"; // 为了避免命名冲突，将 Redux 的 Provider 重命名为 ReduxProvider
import { Provider as PaperProvider } from "react-native-paper"; // 引入 React Native Paper 的 Provider
import store from "@/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { Router } from "@/auth/routes/Router";
import { AuthProvider } from "@/auth/contexts/Auth";

if (typeof setImmediate === "undefined") {
  window.setImmediate = (fn) => setTimeout(fn, 0);
}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <Toast />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
