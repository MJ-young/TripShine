import React from "react";
import { Appbar } from "react-native-paper";
import icon_exit from "@/assets/icon/icon_exit.png";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/auth/contexts/Auth";

export const UserTitle = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useAuth();
  const logout = () => {
    auth.signOut();
  };
  return (
    <Appbar.Header style={{ backgroundColor: "transparent" }}>
      <Appbar.Content />
      <Appbar.Action icon={icon_exit} color="white" onPress={logout} />
    </Appbar.Header>
  );
};
