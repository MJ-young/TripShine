import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "@views/home/index";
import User from "@views/user/index";
import Publish from "@views/publish/index";
import CardDetail from "@views/card/CardDetail"

import icon_tab_publish from "../../assets/icon_tab_publish.png"


const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarActiveTintColor: "#222222" }} >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Publish"
        component={Publish}
        options={{
          title: "发布",
          tabBarIcon: ({ size }) => (
            <Image source={icon_tab_publish} style={{ width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          title: "User",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CardDetail"
        component={CardDetail}
        options={{
          tabBarButton: () => null, // 隐藏该页面的标签按钮
        }}
      />
    </Tab.Navigator >

  );
}
