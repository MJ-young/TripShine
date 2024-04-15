import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, Avatar, Dialog, Portal } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function UniPopup({ show, onHidePopup }) {
  const hide = () => {
    onHidePopup();
  };

  return (
    <Portal style={styles.portal}>
      <Dialog visible={show} onDismiss={hide} style={styles.dialog}>
        <Dialog.Content>
          <View style={styles.content}>
            <Avatar.Icon
              size={80}
              icon={() => (
                <MaterialCommunityIcons name="alert" color="white" size={50} />
              )}
              style={styles.icon}
            />
          </View>

          <Text style={styles.infoText}>1. 禁止涉及黄色信息</Text>
          <Text style={styles.infoText}>2. 禁止涉及政治信息</Text>
          <Text style={styles.infoText}>3. 禁止涉及广告信息</Text>
          <Text style={styles.infoText}>4. 禁止涉及骚扰信息</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hide}>我已知晓</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
// Get the device width for setting the dialog width
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  portal: {
    textAlign: "center",
    position: "relative",
    alignItems: "center",
  },
  dialog: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    height: 360,
    transform: [{ translateX: -180 }, { translateY: -250 }],
    borderRadius: 20,
    padding: 20,
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
  },
  icon: {
    marginBottom: 15,
    textAlign: "center",
  },
  infoText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
