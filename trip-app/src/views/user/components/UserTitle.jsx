import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import icon_menu from "@/assets/icon_menu.png";
import icon_share from "@/assets/icon_share.png";

export const UserTitle = () => {
  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          // sideMenuRef.current?.show()
        }}
      >
        <Image
          style={styles.menuImg}
          source={icon_menu}
          tintColor={"white"}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <Image
        style={[styles.menuImg, styles.rightMenuImg]}
        source={icon_share}
        tintColor={"white"}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    width: "100%",
    // height: 48,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    height: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  menuImg: {
    width: 28,
    height: 28,
  },
  rightMenuImg: {
    marginHorizontal: 12,
  },
});
