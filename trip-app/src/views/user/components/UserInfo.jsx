import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { updateAvatar } from "@/api/user";
import { base64ToFile } from "@/utils/upload";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initUserInfo = {
  username: "Guest",
  avatar:
    "http://tripshine.oss-cn-shanghai.aliyuncs.com/public/images/129365f628812999703915e5b81182b2.jpg",
};

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      const _authData = await AsyncStorage.getItem("@AuthData");
      const user = _authData ? JSON.parse(_authData) : { user: initUserInfo };
      // console.log("user:", user);
      setUserInfo(user.user);
      setToken(user.token);
    };

    loadUserInfo();
  }, []);

  const handleAvatarChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("请允许访问相册权限");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      // console.log("update avatar", result.assets[0]);
      const parts = localUri.match(/^data:(.+);base64,(.+)$/);
      const formData = new FormData();
      if (parts) {
        const file = base64ToFile(localUri);
        // console.log("webfile:", file);
        formData.append("avatar", file);
      } else {
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append("avatar", { uri: localUri, name: filename, type });
      }
      updateAvatar(formData)
        .then(async (response) => {
          // 更新本地存储的用户信息
          const updatedUserInfo = { ...userInfo, avatar: response.url };
          await AsyncStorage.setItem(
            "@AuthData",
            JSON.stringify({ user: updatedUserInfo, token })
          );
          setUserInfo(updatedUserInfo);
        })
        .catch((error) => {
          console.error("Error updating avatar:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image source={{ uri: userInfo.avatar }} size={96} />
        <IconButton
          icon="pencil-circle"
          size={32}
          style={styles.iconButton}
          color="#6200ee"
          onPress={handleAvatarChange}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{userInfo.username}</Text>
        <Text style={styles.description}>我正在努力创作中......</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    position: "absolute",
    right: -10,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF", // Assuming you want a white background for the icon
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: -10,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 20,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});
