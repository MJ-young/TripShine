import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function User() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        // onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        // onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.btn}>
        <Button title="Login" onPress={() => console.log("Login")} />
        <Button title="Register" onPress={() => console.log("Register")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});
