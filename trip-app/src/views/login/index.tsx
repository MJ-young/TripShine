import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/actions";
import Cookies from "js-cookie";
import { encrypt } from "@/utils/jsencrypt";
import { login, register } from "@/api/user";
import {
  Button,
  TextInput,
  Checkbox,
  Text,
  ActivityIndicator,
  Card,
  Provider as PaperProvider,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import NavigationService from "@/utils/NavigationService";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      navigation.navigate("Main");
    }
  }, [token]);

  const handleChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onFinish = async () => {
    setLoading(true);
    login(form)
      .then((response) => {
        dispatch(
          setUser({
            user: response.userInfo,
            token: response.token,
          })
        );
        if (form.remember) {
          Cookies.set("password", encrypt(form.password), { expires: 7 });
          Cookies.set("remember", form.remember.toString(), { expires: 7 });
        } else {
          Cookies.remove("password");
          Cookies.remove("remember");
        }
        NavigationService.navigate("Main");
      })
      .catch((error) => {
        console.error("login failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRegister = async () => {
    setLoading(true);
    register(form)
      .then((response) => {
        dispatch(
          setUser({
            user: response.userInfo,
            token: response.token,
          })
        );
        if (form.remember) {
          Cookies.set("password", encrypt(form.password), { expires: 7 });
          Cookies.set("remember", form.remember.toString(), { expires: 7 });
        } else {
          Cookies.remove("password");
          Cookies.remove("remember");
        }
        NavigationService.navigate("Main");
      })
      .catch((error) => {
        console.error("register failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PaperProvider>
      <Card style={styles.card}>
        <Text style={styles.mainTitle}>TripShine</Text>
        <Text style={styles.subTitle}>Brilliant all the way</Text>
        <TextInput
          mode="outlined"
          label="用户名"
          value={form.username}
          onChangeText={(text) => handleChange("username", text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="密码"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          style={styles.input}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={form.remember ? "checked" : "unchecked"}
            onPress={() => handleChange("remember", !form.remember)}
          />
          <Text>记住密码</Text>
        </View>
        <Button
          mode="contained"
          onPress={onFinish}
          disabled={loading}
          style={styles.button}
        >
          {loading ? <ActivityIndicator size={24} /> : "登录"}
        </Button>
        <Button
          mode="outlined"
          onPress={onRegister}
          disabled={loading}
          style={styles.button}
        >
          {loading ? <ActivityIndicator size={24} /> : "注册"}
        </Button>
      </Card>
    </PaperProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 30,
    // fontFamily: "Arial Rounded MT Bold",
    color: "#0A83F9",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 22,
    color: "#FFD700",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
