// menuItems.js
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

interface MenuItem {
  key: string;
  path: string;
  label: string;
  icon: JSX.Element;
  roles: string[];
}

const menuItems: MenuItem[] = [
  // {
  //   key: "dataMiner",
  //   path: "/dataMiner",
  //   label: "Data Miner",
  //   icon: React.createElement(HeartOutlined),
  //   roles: ["common", "super"],
  // },
  {
    key: "tripAdmin",
    path: "/tripAdmin",
    label: "Trip Admin",
    icon: React.createElement(HeartOutlined),
    roles: ["common", "super"],
  },
  {
    key: "userAdmin",
    path: "/userAdmin",
    label: "User Admin",
    icon: React.createElement(UserOutlined),
    roles: ["super"], // 仅'super'角色可以访问
  },
  // {
  //   key: "event",
  //   path: "/event",
  //   label: "Event",
  //   icon: React.createElement(HeartOutlined),
  //   roles: ["common", "super"],
  // },
];

export default menuItems;
