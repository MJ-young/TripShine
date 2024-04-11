import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/actions";
import Cookies from "js-cookie";
import { encrypt } from "@/utils/jsencrypt";
import { login, register } from "@/api/user";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import NavigationService from "@/utils/NavigationService";
import Container from "@mui/material/Container";
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

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "remember" ? checked : value,
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
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Typography variant="h4" component="h1" sx={styles.mianTitle}>
          TripShine
        </Typography>
        <Typography variant="h6" component="h2" sx={styles.subTitle}>
          Brilliant all the way
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
          label="记住密码"
        />
        <Button
          variant="contained"
          onClick={onFinish}
          disabled={loading}
          fullWidth
          sx={styles.loginButton}
        >
          {loading ? <CircularProgress size={24} /> : "登录"}
        </Button>
        <Button
          variant="outlined"
          onClick={onRegister}
          disabled={loading}
          fullWidth
          sx={styles.registerButton}
        >
          {loading ? <CircularProgress size={24} /> : "注册"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    pb: 8,
  },
  mianTitle: {
    color: "#0A83F9", // 蓝色
    fontFamily: "Arial Rounded MT Bold", // 圆润的字体
    textAlign: "center",
    fontWeight: "bold",
    mt: 2,
    mb: 1,
  },
  subTitle: {
    color: "#FFD700", // 金黄色
    fontFamily: "Garamond", // 更正式的字体
    fontWeight: "bold",
    textAlign: "center",
    mb: 3,
  },
  loginButton: {
    marginTop: 2,
    marginBottom: 1,
    boxShadow: 3, // 添加阴影
    "&:hover": {
      boxShadow: 6, // 鼠标悬停时增加阴影
    },
  },
  registerButton: {
    marginTop: 1,
    boxShadow: 1,
    "&:hover": {
      boxShadow: 4,
    },
  },
};
