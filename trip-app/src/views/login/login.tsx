import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/actions"; // 请根据你的项目路径调整
import Cookies from "js-cookie";
import { encrypt } from "@/utils/jsencrypt"; // 请根据你的项目路径调整
import { loginUsr, registerUsr } from "@/api/login"; // 请根据你的项目路径调整
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
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

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "remember" ? checked : value,
    }));
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const response = await loginUsr({
        username: form.username,
        password: form.password,
      });
      dispatch(
        setUser({
          user: response.userInfo,
          token: response.token,
        })
      );
      if (form.remember) {
        Cookies.set("username", form.username, { expires: 7 });
        Cookies.set("password", encrypt(form.password), { expires: 7 });
        Cookies.set("remember", form.remember.toString(), { expires: 7 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("remember");
      }
      // 跳转到主页逻辑
      // navigation.navigate("Home");
    } catch (error) {
      console.error("login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async () => {
    setLoading(true);
    try {
      const response = await registerUsr({
        username: form.username,
        password: form.password,
      });
      console.log("register success:", response);
      // 可以选择在这里直接登录用户，或者显示注册成功的消息
      setLoading(false);
      // 可能的注册成功逻辑...
    } catch (error) {
      console.error("register failed:", error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        美好生活随手记
      </Typography>
      <TextField
        label="用户名"
        variant="outlined"
        name="username"
        value={form.username}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        label="密码"
        type="password"
        variant="outlined"
        name="password"
        value={form.password}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
        }
        label="记住我"
      />
      {/* <Button
        variant="contained"
        onClick={onFinish}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "登录"}
      </Button> */}
      <Button
        variant="contained"
        onClick={onFinish}
        disabled={loading}
        fullWidth
        sx={{ mt: 2, mb: 1 }}
      >
        {loading ? <CircularProgress size={24} /> : "登录"}
      </Button>
      <Button
        variant="outlined"
        onClick={onRegister}
        disabled={loading}
        fullWidth
        sx={{ mt: 1 }}
      >
        {loading ? <CircularProgress size={24} /> : "注册"}
      </Button>
    </Box>
  );
};

export default Login;
