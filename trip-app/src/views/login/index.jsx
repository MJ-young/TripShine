import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react-native";
import icon_logo from "../../assets/icon_logo.png";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    // 实现登录逻辑
    console.log("Logging in with:", email, password);
  };

  const handleRegister = () => {
    // 实现注册逻辑
    console.log("Registering with:", email, password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={icon_logo} // 替换为你的图片路径
        style={styles.logo}
      />
      <Text style={styles.subtitle}>美好生活随手记</Text>

      <Text style={styles.title}>{isRegistering ? "注册" : "登录"}</Text>
      <TextInput
        style={styles.input}
        placeholder="请输入昵称"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="请输入密码"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isRegistering ? "注册" : "登录"}
          onPress={isRegistering ? handleRegister : handleLogin}
        />
        <Button
          title={isRegistering ? "返回登录" : "注册"}
          onPress={() => setIsRegistering(!isRegistering)}
          color={isRegistering ? "#888" : "#0066FF"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    // marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
});

export default Login;
