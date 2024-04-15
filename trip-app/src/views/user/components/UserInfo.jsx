import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/store/actions";
import { updateAvatar } from "@/api/user";
import { base64ToFile } from "@/utils/upload";

const initUserInfo = {
  username: "Guest",
  avatar:
    "http://tripshine.oss-cn-shanghai.aliyuncs.com/public/images/129365f628812999703915e5b81182b2.jpg",
};

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(initUserInfo);

  useEffect(() => {
    const userInfo = user.user;
    setUserInfo(userInfo);
  }, [user]);

  const handleAvatarChange = async () => {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("请允许访问相册权限");
      return;
    }

    // Launch the picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1], // Ensure the image is square
      quality: 1,
    });

    if (!result.cancelled) {
      let localUri = result.assets[0].uri;
      const parts = localUri.match(/^data:(.+);base64,(.+)$/);
      const formData = new FormData();
      if (parts) {
        const file = await base64ToFile(localUri);
        formData.append("avatar", file);
      } else {
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formData.append("avatar", { uri: localUri, name: filename, type });
      }
      updateAvatar(formData)
        .then((response) => {
          dispatch(updateUser({ avatar: response.url }));
          setUserInfo((prev) => ({ ...prev, avatar: response.url }));
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
