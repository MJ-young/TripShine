// NavBar.js
import React, { useState } from "react";
import { View, Picker, Button, StyleSheet } from "react-native";

const NavBar = ({ onPublish }) => {
  const [privacy, setPrivacy] = useState("所有人可见");

  return (
    <View style={styles.navBar}>
      <View style={styles.privacyContainer}>
        <Picker
          selectedValue={privacy}
          style={styles.picker}
          onValueChange={(itemValue) => setPrivacy(itemValue)}
        >
          <Picker.Item label="所有人可见" value="所有人可见" />
          <Picker.Item label="仅自己可见" value="仅自己可见" />
        </Picker>
        <Button onPress={onPublish} style={styles.button}>
          发布
        </Button>
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  privacyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picker: {
    width: 150,
  },
  button: {
    padding: 5,
    backgroundColor: "#ff2741",
    color: "#fff",
  },
});
