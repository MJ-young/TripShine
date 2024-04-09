import LoginPage from "@views/login";
import TripAdmin from "@views/tripAdmin";
import UserAdmin from "@views/userAdmin";
import EventPage from "@/views/event";
import { HeartOutlined } from "@ant-design/icons";
import React from "react";

const routes = [
  {
    path: "/",
    component: LoginPage,
    label: "Login",
    icon: React.createElement(HeartOutlined, null),
  },
  {
    path: "/tripAdmin",
    component: TripAdmin,
    label: "TripAdmin",
    icon: React.createElement(HeartOutlined, null),
  },
  {
    path: "/userAdmin",
    component: UserAdmin,
    label: "UserAdmin",
    icon: React.createElement(HeartOutlined, null),
  },
  {
    path: "/event",
    component: EventPage,
    label: "EventPage",
    icon: React.createElement(HeartOutlined, null),
  },
];

export default routes;
