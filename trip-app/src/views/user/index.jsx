// User.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, RefreshControl, Image } from "react-native";
import UserInfo from "./components/UserInfo";
import UserTripTab from "./components/UserTripTab";
import icon_mine_bg from "@/assets/icon_mine_bg.jpg";
import { UserTitle } from "./components/UserTitle";

const User = () => {
  return (
    <View
      style={{ flex: 1 }}
      refreshControl={<RefreshControl onRefresh={() => {}} />}
    >
      <UserTitle />
      <Image style={[styles.bgImg, { height: 200 }]} source={icon_mine_bg} />
      <UserInfo />
      <UserTripTab />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  bgImg: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
