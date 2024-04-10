import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions";
import { setToken } from "../../utils/auth"
import icon_logo from "../../assets/icon_logo.png";
import { registerUsr, loginUsr } from "../../api/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false); // 添加注册状态变量
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [form] = Form.useForm();

  const handleRegister = async () => {
    // setRegistering(true);
    form.validateFields()
      .then(values => {
        registerUsr(values)
          .then(response => {
            message.success(response.message);
            setRegistering(true); // 注册完成，设置注册状态为false
          })
          .catch(error => {
            message.error(error.message);
            setRegistering(false);
          })
      })
  };

  const handleLogin = async () => {
    form.validateFields()
      .then(values => {
        loginUsr(values)
          .then(response => {
            message.success(response.message);
            console.log("111", response);
            // 触发SET_USER action
            const payload = {
              token: response.token,
            };
            dispatch(setToken(payload));
            navigation.navigate("User");
          })
          .catch(error => {
            message.error(error.message);
          })
      })
  };

  return (
    <View style={styles.container}>
      <Image
        source={icon_logo}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>美好生活随手记</Text>


      <Form form={form} onFinish={handleRegister}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入昵称" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入昵称"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入密码"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <View style={styles.buttonContainer}>
            <Button
              type="primary"
              title="注册"
              htmlType="submit"
              onPress={handleRegister} // Call handleRegister on press
              style={styles.button}
              disabled={registering}
            />

            <Button
              type="primary"
              title="登录"
              onPress={handleLogin} // Call handleLogin on press
              style={styles.button}
            />
          </View>
        </Form.Item>
      </Form>
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
    width: 300,
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "45%", // Adjust button width as needed
  },
});

export default Login;
