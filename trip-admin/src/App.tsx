// import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@views/login";
import TripAdmin from "@views/tripAdmin";
import UserAdmin from "@views/userAdmin";
import EventPage from "@/views/event";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import routes from "./router";
import "./common.less";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface MenuItem {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const routeItems: MenuItem[] = [];
  routes.forEach((item) => {
    routeItems.push({
      label: <Link to={item.path}>{item.label}</Link>,
      key: item.path,
      icon: item.icon,
    });
  });
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-box">
          <a href="https://reactjs.org/" target="_blank">
            <img
              src="https://img.icons8.com/color/48/000000/react-native.png"
              className="logo"
              alt="React logo"
            />
          </a>
          <div>{!collapsed ? "Trip Shine" : "Trip"}</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={routeItems}
        />
      </Sider>
      <Layout className="mian">
        <Header className="header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="btn"
          />
          <div className="title">Trip Shine 后台管理系统</div>
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/tripAdmin" element={<TripAdmin />} />
            <Route path="/userAdmin" element={<UserAdmin />} />
            <Route path="/event" element={<EventPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
