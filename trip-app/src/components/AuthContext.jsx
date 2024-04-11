// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AuthDialog from "./AuthDialog";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const token = useSelector((state) => state.user.token); // 从 Redux store 获取 token
  const [showError, setShowError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!token) {
      setShowError(true);
    }
    console.log("AuthContext token:", token);
  }, [token]);

  const handleClose = () => {
    navigation.navigate("Login");
    setShowError(false);
  };

  return (
    <AuthContext.Provider value={{ token, showError }}>
      {children}
      <AuthDialog show={showError} onClose={handleClose} />
    </AuthContext.Provider>
  );
};
