// UserTabs.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const UserTabs = ({ tabIndex, setTabIndex }) => {
  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.tabButton} onPress={() => setTabIndex(0)}>
        <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>
          已发布
        </Text>
        {tabIndex === 0 && <View style={styles.line} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => setTabIndex(1)}>
        <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>
          待审核
        </Text>
        {tabIndex === 1 && <View style={styles.line} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => setTabIndex(2)}>
        <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>
          未通过
        </Text>
        {tabIndex === 2 && <View style={styles.line} />}
      </TouchableOpacity>
    </View>
  );
};

export default UserTabs;

const styles = StyleSheet.create({
  titleLayout: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  tabTxt: {
    fontSize: 17,
    color: "#999",
  },
  tabTxtSelected: {
    fontSize: 17,
    color: "#333",
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: "#ff2442",
    borderRadius: 1,
    position: "absolute",
    bottom: 6,
  },
});
