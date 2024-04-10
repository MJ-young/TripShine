// UserInfo.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import icon_avatar from "@/assets/icon_avatar.png";
import icon_add from "@/assets/icon_add.png";

const userInfo = {
  avatar: icon_avatar,
  nickName: "瓦吉吉哇",
  desc: "我正在努力创作中......",
};

const UserInfo = () => {
  return (
    <View style={styles.avatarLayout}>
      <Image style={styles.avatarImg} source={userInfo.avatar} />
      <Image style={styles.addImg} source={icon_add} />
      <View style={styles.nameLayout}>
        <Text style={styles.nameTxt}>{userInfo.nickName}</Text>
        <Text style={styles.descTxt}>{userInfo.desc}</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  avatarLayout: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 15,
  },
  avatarImg: {
    width: 96,
    height: 96,
    resizeMode: "cover",
    borderRadius: 48,
  },
  addImg: {
    width: 28,
    height: 28,
    marginLeft: -28,
    marginBottom: 2,
  },
  nameLayout: {
    marginLeft: 20,
  },
  nameTxt: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  descTxt: {
    fontSize: 14,
    color: "white",
  },
});
