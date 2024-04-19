// MainLayout.tsx
import React, { ReactNode, useState } from "react";
import { getToken } from "@/utils/auth";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Layout, Menu, Button, Modal } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  // SunOutlined,
} from "@ant-design/icons";
import "./common.less";
import Cookies from "js-cookie";
import menuItems from "./menuItems";
import { clearUser } from "@/store/actions";

const { Header, Sider, Content } = Layout;

// 定义Props类型，包括children
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const userRole = Cookies.get("adminRole") || "admin";
  const username = Cookies.get("adminName");
  const token = getToken();
  // 如果用户未登录，直接重定向到登录页面
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const filteredMenuItems = menuItems
    .filter((item) => item.roles.includes(userRole))
    .map((item) => ({
      ...item,
      label: <Link to={item.path}>{item.label}</Link>,
    }));

  // 退出登录
  const logout = () => {
    // 弹出确认框使用antd的Modal组件
    Modal.confirm({
      title: "确认退出登录？",
      onOk: () => {
        // 清除token
        // removeToken();
        // removeUser();
        clearUser();
        // 跳转到登录页面
        navigate("/");
      },
    });
  };

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-box">
          <img src="src/assets/trip.svg" className="logo" alt="React logo" />
          {/* <SunOutlined style={{ fontSize: "4rem", color: "#FFA500" }} /> */}
          <div>{!collapsed ? "Trip Shine" : "Trip"}</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={filteredMenuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>
      <Layout className="main">
        <Header className="header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="btn"
          />
          <div className="title">Trip Shine 后台管理系统</div>
          <div className="flex-grow" />
          <div className="right-menu-item">
            <div className="right-name">你好&nbsp;,&nbsp;{username}</div>
            <div>
              <Button
                type="text"
                icon={
                  <LogoutOutlined
                    style={{ fontSize: "1rem", color: "#FFA500" }}
                  />
                }
                onClick={logout}
              >
                <span className="right-button-title">退出登录</span>
              </Button>
            </div>
          </div>
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
