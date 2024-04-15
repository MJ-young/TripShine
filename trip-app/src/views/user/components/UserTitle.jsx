import React from "react";
import { Appbar } from "react-native-paper";
import icon_menu from "@/assets/icon/icon_menu.png";
import icon_share from "@/assets/icon/icon_share.png";
import icon_exit from "@/assets/icon/icon_exit.png";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/actions";
import { useNavigation } from "@react-navigation/native";

export const UserTitle = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logout = () => {
    dispatch(clearUser());
    navigation.navigate("Login");
  };
  return (
    <Appbar.Header style={{ backgroundColor: "transparent" }}>
      <Appbar.Content />
      <Appbar.Action icon={icon_exit} color="white" onPress={logout} />
    </Appbar.Header>
  );
};
