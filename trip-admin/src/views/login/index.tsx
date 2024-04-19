// pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined, SunOutlined } from "@ant-design/icons";
import { login } from "@/api/login";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/actions";
import { getToken } from "@/utils/auth";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import "./index.scss";

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 如果已经登录，直接跳转到主页
    if (getToken()) {
      navigate("/tripAdmin");
    }
    getCookie();
  });

  const getCookie = () => {
    const username = Cookies.get("adminName");
    const password = Cookies.get("adminPwd");
    const remember = Cookies.get("adminRemember");
    if (username && password && remember) {
      form.setFieldsValue({
        username: username,
        password: decrypt(password),
        remember: remember,
      });
    }
  };

  const onFinish = () => {
    setLoading(true);
    login(form.getFieldsValue())
      .then((response) => {
        // console.log("login success:", response);
        setLoading(false);
        const payload = {
          user: response.userInfo,
          token: response.token,
        };
        dispatch(setUser(payload));
        if (form.getFieldValue("remember")) {
          Cookies.set("adminName", form.getFieldValue("username"), {
            expires: 7,
          });
          Cookies.set("adminPwd", encrypt(form.getFieldValue("password")), {
            expires: 7,
          });
          Cookies.set("adminRemember", form.getFieldValue("remember"), {
            expires: 7,
          });
          Cookies.set("adminRole", response.userInfo.role, {
            expires: 7,
          });
        } else {
          Cookies.remove("adminName");
          Cookies.remove("adminPwd");
          Cookies.remove("adminRemember");
          Cookies.remove("adminRole");
        }
        // 跳转到主页
        navigate("/tripAdmin");
      })
      .catch((error) => {
        console.error("login failed:", error);
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-branding">
        <h1 className="logo-name">
          <div>
            <span className="first-letter">T</span>rip
          </div>
          <div>
            <span className="first-letter">S</span>hine
          </div>
          <SunOutlined style={{ fontSize: "7rem", color: "#FFA500" }} />
        </h1>
      </div>
      <div className="login-form-container">
        <Card>
          <h2 className="login-title">TripShine后台管理系统</h2>
          <Form
            form={form}
            name="normal_login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
