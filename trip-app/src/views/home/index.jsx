import { StyleSheet, Image, View, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/splash.png")}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.btn}>
        <Button
          title="Go to User"
          onPress={() => navigation.navigate("User")}
        />
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
  btn: {
    justifyContent: "space-around",
    width: "50%",
    height: "20%",
    justifyContent: "space-around",
  },
});
