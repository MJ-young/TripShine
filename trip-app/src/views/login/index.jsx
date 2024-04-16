import React, { useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import {
  Button,
  TextInput,
  Card,
  Provider as PaperProvider,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { useAuth } from "@/auth/contexts/Auth";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("用户名是必填项"),
  password: Yup.string().required("密码是必填项"),
});

const Login = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleAction = async (values) => {
    setLoading(true);
    try {
      if (actionType === "login") {
        await auth.signIn(values);
        console.log("Login successful");
      } else if (actionType === "register") {
        await auth.registerUser(values);
        console.log("Registration successful");
      }
    } catch (error) {
      console.error(`${actionType} failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <Card style={styles.card}>
        <Text style={styles.mainTitle}>TripShine</Text>
        <Text style={styles.subTitle}>Brilliant all the way</Text>
        <Formik
          initialValues={{ username: "", password: "", remember: false }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleAction(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                mode="outlined"
                label="用户名"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                style={styles.input}
                error={touched.username && errors.username}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <TextInput
                mode="outlined"
                label="密码"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.input}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <Button
                mode="contained"
                onPress={() => {
                  setActionType("login");
                  handleSubmit();
                }}
                disabled={loading}
                style={styles.button}
              >
                {loading ? <ActivityIndicator size={24} /> : "登录"}
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  setActionType("register");
                  handleSubmit();
                }}
                disabled={loading}
                style={styles.button}
              >
                {loading ? <ActivityIndicator size={24} /> : "注册"}
              </Button>
            </>
          )}
        </Formik>
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
  button: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 4,
  },
});
